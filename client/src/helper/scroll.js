export const scrollToBottom = (commentsEndRef) => {
  commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};
export const scrollToTop = (commentsStartRef) => {
  commentsStartRef.current?.scrollIntoView({ behavior: 'smooth' });
};
export const scrollToTop2 = (commentsStartRef) => {
  if (commentsStartRef.current) {
    const offset = commentsStartRef.current.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
};
