import Tags from '../Data/Tag';

export const getTags = () => {
    return JSON.parse(Tags);
}

export const getRandomTag = (limit = 1) => {
    let tags = JSON.parse(Tags);
    return tags.filter(t => t.IsMain == 1).sort(() => .5 - Math.random()).slice(0, limit)
}