import { Injectable } from "@nestjs/common";
import { GetVocabDto } from "./dtos";
import { parse } from 'node-html-parser';
import axios from 'axios';

@Injectable()
export class VocabularyService {
    constructor() {

    }
    async getDataFromUrl(dto: GetVocabDto) {
        const { url } = dto;
        const getData = await axios.get(url, {responseType: 'document'});
        const root = parse(getData.data);
        // const word = root.getElementById("vocabulary_h_1").text;
        // const typeWord = root.querySelector(".pos").text;
        // const noun_type = root.getElementById("vocabulary_ifgs_1").text;
        const meaning = root.querySelectorAll(".def");
        console.log(meaning.length);
    }
}