import { Column, Entity, OneToMany } from "typeorm";
import { VocabularyDetailsEntity } from "../vocabulary-details/vocabulary-details.entity";
import { BaseEntity } from "src/common/mysql/base.entity";

@Entity("vocabulary")
export class VocabularyEntity extends BaseEntity {
    @Column({
        length: 50
    })
    word: string

    @Column({
        length: 255,
        name: "audio_url"
    })
    audioUrl: string

    @Column({
        length: 255,
        name: "image_url"
    })
    imageUrl: string

    @Column({
        type: "int",
        name: "group_number"
    })
    groupNumber: number

    @Column({
        length: 100,
        name: "word_type"
    })
    wordType: string

    @Column({
        length: 100,
        name: "noun_type"
    })
    nounType: string

    @Column({
        type: "simple-array",
        name: "synonyms"
    })
    synonyms: string[]

    @Column({
        length: 50,
        name: "phonetic_spelling"
    })
    phoneticSpelling: string

    @Column({
        type: "simple-array",
        name: "related_words"
    })
    relatedWords: string[]

    @OneToMany(() => VocabularyDetailsEntity, (vocabularyDetails) => vocabularyDetails.word)
    details: VocabularyDetailsEntity
}