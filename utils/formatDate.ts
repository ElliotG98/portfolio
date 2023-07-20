const formatDate = (date: string) => {
    const now = new Date(date).toLocaleDateString('en-GB');

    return now;
};

export default formatDate;
