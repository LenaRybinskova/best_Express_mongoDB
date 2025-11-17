import {model, Schema, Types} from 'mongoose'


export interface IRating {
    userId: Types.ObjectId;
    rating: number;
}
// TODO потом добавить поле чтобы считалась продолжительность всего курса исходя из суммы продожительности видео
export interface ICourse extends Document {
    authorId: Types.ObjectId
    title: string
    description: string
    startedAt: Date
    endedAt: Date
    price: number
    imagePreview?:string

    lessonsId?: Types.ObjectId[]
    commentsId?: Types.ObjectId[]
    ratingStat?: IRating[]
    ratingResult?: number
    ratingCount?: number;
    studentsId?: Types.ObjectId[]
    createdAt?: Date;
    updatedAt?: Date;
}

const coursesSchema = new Schema<ICourse>({
    authorId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, minlength: 3, maxlength: 30, required: true},
    description: {type: String, minlength: 10, maxlength: 1000, required: true},
    startedAt: {type: Date, required: true},
    endedAt: {type: Date, required: true},
    price: {type: Number, required: true},
    imagePreview:{type:String,  default:"", required: false},
    lessonsId: [{type: Schema.Types.ObjectId, ref: 'Lesson', default: []}],
    commentsId: [{type: Schema.Types.ObjectId, ref: 'Comment', default: []}],
    //Embedded
    ratingStat: {
        type: [{
            userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
            rating: {type: Number, required: true, min: 1, max: 5},
        }],
        default: []
    },
    ratingResult: {type: Number, min: 0, max: 5, default: 0},
    ratingCount: {type: Number, default: 0},
    studentsId: [{type: Schema.Types.ObjectId, ref: 'User', default: []}]
}, {timestamps: true})

export const CourseModel = model('Course', coursesSchema)


// будет срабатывать перед каждым .save() для пересчета поля ratingResult
coursesSchema.pre('save', function (next) {

    if (this.ratingStat && this.ratingStat.length > 0) {
        const sum = this.ratingStat.reduce((total, rating) => total + rating.rating, 0);
        this.ratingResult = Number((sum / this.ratingStat.length).toFixed(1));
        this.ratingCount = this.ratingStat.length;
    } else {
        this.ratingResult = 0;
        this.ratingCount = 0;
    }
    next();
});