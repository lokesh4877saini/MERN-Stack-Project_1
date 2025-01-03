class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {};
        // console.log(keyword)
        this.query = this.query.find({ ...keyword })
        return this;
    }
    filter(){
        const queryCopy = {...this.queryStr}
        // Removing some fields for category
        const removeFields = ["keyword","page",'limit'];
        removeFields.forEach(key=>delete queryCopy[key]);

        // filter for price 
        // converting  obj into string 
        let queryStr = JSON.stringify(queryCopy) 
        // again string into obj
        queryStr = queryStr.replace(/\bgt|gte|lt|lte\b/g,key =>`$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }
    pagination(resultPerPage){
        // console.log("Pagination called")
        const currentPage = Number(this.queryStr.page) || 1; 
        const skip = resultPerPage * (currentPage - 1)
        // console.log(skip)
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;
 