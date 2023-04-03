import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { VocabularyEntity } from "../vocabulary/vocabulary.entity";
import { BaseEntity } from "src/common/mysql/base.entity";

@Entity("vocabulary-details")
export class VocabularyDetailsEntity extends BaseEntity {
    @Column({
        name: "short_description"
    })
    shortDesc: string

    @Column({
        name: "meaning"
    })
    meaning: string

    @Column({
        name: "level"
    })
    level: string


    @Column({
        type: "simple-array",
        name: "examples"
    })
    examples: string[]

    @ManyToOne(
        () => VocabularyEntity,
        vocabulary => vocabulary.details,
        { eager: true },
    )
    @JoinColumn({ name: 'word_id' })
    word: VocabularyEntity
}