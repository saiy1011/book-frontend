export const scrollIntoView = (view: HTMLElement | null) => {
    if (view === null) {
        console.log('View to scroll into is null');
        return;
    }
    view?.scrollIntoView({ behavior: 'smooth' });
};
