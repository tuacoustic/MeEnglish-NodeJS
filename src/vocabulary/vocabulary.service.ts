import { Injectable } from "@nestjs/common";
import { AddVocabDto } from "./dtos";
import { parse } from 'node-html-parser';
import axios from 'axios';
import { InjectRepository } from "@nestjs/typeorm";
import { VocabularyEntity } from "./vocabulary.entity";
import { BaseService } from "src/common/mysql/base.service";
import { Repository } from "typeorm";
import { VocabularyDetailsService } from "src/vocabulary-details/vocabulary-details.service";

export interface GetDataFrService {
    status: boolean,
    data: any,
}

@Injectable()
export class VocabularyService extends BaseService<VocabularyEntity> {
    constructor(
        @InjectRepository(VocabularyEntity) vocabRepo: Repository<VocabularyEntity>,
        private vocabDetailsService: VocabularyDetailsService, 
    ) {
        super(vocabRepo) 
    } 
    async getDataFromUrl(dto: AddVocabDto): Promise<GetDataFrService> {
        const { url, examples, relatedWords, imageUrl, groupNumber } = dto;
        const getData = await axios.get(url, {responseType: 'document'});
        const root = parse(getData.data);
        const audio = root.querySelector(".phons_n_am");
        const startAudioUrl = audio.innerHTML.indexOf("data-src-mp3");
        const endAudioUrl = audio.innerHTML.indexOf(".mp3")
        const audioUrl = audio.innerHTML.slice(startAudioUrl + 14, endAudioUrl + 4);
        const word = root.querySelector(".headword").text;
        const wordType = root.querySelector(".pos").text;
        const nounType = root.getElementById("vocabulary_ifgs_1") ? root.getElementById("vocabulary_ifgs_1").text : "";
        const synonyms = root.querySelector(".closed") ? root.querySelector(".closed").text : "";
        const getMeaning = root.querySelectorAll(".def");
        const meaning = [];
        const getLevel = root.querySelectorAll(".symbols")
        const level = [];
        const getShortDesc = root.querySelectorAll(".shcut") ? root.querySelectorAll(".shcut") : [];
        const shortDesc = [];
        // const where = {
        //     word,
        // }
        // const existedWord = await this.getOne(where, "word");
        // if(existedWord) {
        //     return {
        //         status: false,
        //         data: {
        //             word,
        //         }
        //     };
        // }
        for(let i = 0; i < getLevel.length; i += 1) {
            const startLevelUrl = getLevel[i].innerHTML.indexOf("level=");
            const levelEach = getLevel[i].innerHTML.slice(startLevelUrl + 6, startLevelUrl + 8);
            level.push(levelEach);
        }
        for (let i = 0; i < getMeaning.length; i += 1) {
            meaning.push(getMeaning[i].text);
        }
        for (let i = 0; i < getShortDesc.length; i += 1) {
            shortDesc.push(getShortDesc[i].text);
        }
        // Save data to Vocabulary table
        const saveVocab = await this.save({
            audioUrl, word, wordType, nounType, synonyms, meaning, relatedWords, imageUrl, groupNumber
        })

        const savedVocabDetails = [];
        for (let index = 0; index < meaning.length; index += 1) {
            const value = meaning[index];
            const meaningValue = examples[index+1] ? examples[index+1] : [];
            const levelValue = level[index] ? level[index] : "";
            const shortDescValue = shortDesc[index] ? shortDesc[index] : "";
            const saved = await this.vocabDetailsService.save({
                meaning: value,
                examples: meaningValue,
                word: saveVocab.id,
                level: levelValue,
                shortDesc: shortDescValue,
            })
            savedVocabDetails.push(saved);
        }
        return {
            status: true,
            data: {
                ...saveVocab,
                details: savedVocabDetails
            }
        }
    }
    // consist, derive
}