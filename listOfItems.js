var randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

class listOfItems {
    create() {
        var newList = []
        for (var idx = 0; idx < 20 ; idx++) {
            newList.push({'index': idx, 'name': randomString})
        }
        return newList
    }
}

module.exports = listOfItems