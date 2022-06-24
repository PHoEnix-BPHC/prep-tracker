export const chapterCompleteCheck = (chaptersList) => {
    const chapters = TopicCompleteCheck(chaptersList)
    let status = true
    chapters.map((eachChapter) => {
        eachChapter.topics.map((eachTopic) => {
            if (eachTopic.value === false)
                status = false
        })
        if (status === true)
            eachChapter.value = true
        else
            eachChapter.value = false
        status = true
    })
    return chapters
}

const TopicCompleteCheck = (chapterList) => {
    let questionsComplete = 0
    chapterList.map((eachChapter) => {
        eachChapter.topics.map((eachTopic) => {
            let status = true
            eachTopic.questions.map((eachQuestion) => {
                if (eachQuestion.value === false)
                    status = false
                else
                    questionsComplete += 1
            })
            if (status === true)
                eachTopic.value = true
            if (status === false)
                eachTopic.value = false
            eachTopic.completed = questionsComplete
            status = true
            questionsComplete = 0
        })
    })
    return chapterList
}

export const calculateQuestionCompletion = (chapters) => {
    let total = 0
    chapters.map((eachChapter) => {
        eachChapter.topics.map((eachTopic) => {
            eachTopic.questions.map((eachQuestion) => {
                if (eachQuestion.value === true)
                    total += 1
            })
        })
    })
    return total
}

export const calculateTopicCompletion = (chapters) => {
    let total = 0
    chapters.map((eachChapter) => {
        eachChapter.topics.map((eachTopic) => {
            if (eachTopic.value === true)
                total += 1
        })
    })
    return total
}

export const calculateChapterCompletion = (chapters) => {
    let total = 0
    chapters.map((eachChapter) => {
        if (eachChapter.value === true)
            total += 1
    })
    return total
}
