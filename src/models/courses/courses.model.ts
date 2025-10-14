import {model, Schema, Types} from 'mongoose'


export interface IRating {
    userId: Types.ObjectId;
    rating: number;
}

export interface ICourse extends Document {
    authorId: Types.ObjectId
    title: string
    description: string
    startedAt: Date
    endedAt: Date
    price: number
    lessonsId: Types.ObjectId[]
    commentsId?: Types.ObjectId[]
    ratingStat: IRating[] | []
    ratingResult: number
    ratingCount: number;
    studentsId: Types.ObjectId[]
    createdAt: Date;
    updatedAt: Date;
}

const coursesSchema = new Schema<ICourse>({
    authorId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    startedAt: {type: Date, required: true},
    endedAt: {type: Date, required: true},
    price: {type: Number, required: true},
    lessonsId: [{type: Schema.Types.ObjectId, ref: 'Lesson'}],
    commentsId: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    //Embedded
    ratingStat: [{
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        rating: {type: Number, required: true, min: 1, max: 5},
    }],
    ratingResult: {type: Number, min: 0, max: 5, default: 0},
    ratingCount: {type: Number, default: 0},
    studentsId: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true})

export const CourseModel = model('Course', coursesSchema)


// будет срабатывать перед каждым .save() для пересчета поля ratingResult
coursesSchema.pre('save', function (next) {
    if (this.ratingStat.length > 0) {
        const sum = this.ratingStat.reduce((total, rating) => total + rating.rating, 0);
        this.ratingResult = Number((sum / this.ratingStat.length).toFixed(1));
        this.ratingCount = this.ratingStat.length;
    } else {
        this.ratingResult = 0;
        this.ratingCount = 0;
    }
    next();
});