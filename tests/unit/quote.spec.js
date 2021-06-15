import {mount} from '@vue/test-utils'
import quote from '../../src/components/quote'

test('Quote displays text, when propsData text is given', () => {
    const quoteObject = {
        'text': 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.',
        'author': 'E. W. Dijkstra'
    }

    const wrapper = mount(quote, {
        propsData: {
            text: quoteObject.text,
        }
    });

    const text = wrapper.find('.quote-text');

    expect(text.text()).toContain(quoteObject.text)
});

test('Quote displays author, when propsData author is given', () => {
    const quoteObject = {
        'text': 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.',
        'author': 'E. W. Dijkstra'
    }

    const wrapper = mount(quote, {
        propsData: {
            text: quoteObject.text,
            author: quoteObject.author
        }
    });

    const author = wrapper.find('.quote-author');

    expect(author.text()).toContain(`- ${quoteObject.author}`)
});

test('Quote displays text and author, when propsData text and author are given', () => {
    const quoteObject = {
        'text': 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.',
        'author': 'E. W. Dijkstra'
    }

    const wrapper = mount(quote, {
        propsData: {
            text: quoteObject.text,
            author: quoteObject.author
        }
    });

    const text = wrapper.find('.quote-text');
    const author = wrapper.find('.quote-author');

    expect(text.text()).toContain(quoteObject.text)
    expect(author.text()).toContain(`- ${quoteObject.author}`)
});

test('Quote displays default author, when propsData author is not given', () => {
    const quoteObject = {
        'text': 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.',
        'author': 'E. W. Dijkstra'
    }

    const wrapper = mount(quote, {
        propsData: {
            text: quoteObject.text
        }
    });

    const author = wrapper.find('.quote-author');

    expect(author.text()).toContain('- Unknown Author')
});

test('Quote is not present, when propsData text is undefined', () => {
    const wrapper = mount(quote, {
        propsData: {
            text: undefined,
        }
    });

    const text = wrapper.find('.quote-text').exists();
    expect(text).toBe(false);
});

test('Quote displays add to favorites and remove from favorites buttons as default, when propsData is not given', () => {
    const quoteObject = {
        'text': 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.',
        'author': 'E. W. Dijkstra'
    }

    const wrapper = mount(quote, {
        propsData: {
            text: quoteObject.text
        }
    });

    const addToFavoritesText = wrapper.find('.quote-add-favorites');
    const removeFromFavoritesText = wrapper.find('.quote-remove-favorites');

    expect(addToFavoritesText.text()).toContain('+ add to favorites')
    expect(removeFromFavoritesText.text()).toContain('- remove from favorites')
});

test('Quote does not display add to favorites and remove from favorites, when propsData is set to false for both', () => {
    const quoteObject = {
        'text': 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.',
        'author': 'E. W. Dijkstra'
    }

    const wrapper = mount(quote, {
        propsData: {
            text: quoteObject.text,
            author: quoteObject.author,
            hasFavouriteAddButton: false,
            hasFavouriteRemoveButton: false
        }
    });

    const addToFavoritesText = wrapper.find('.quote-add-favorites').exists();
    const removeFromFavoritesText = wrapper.find('.quote-remove-favorites').exists();

    expect(addToFavoritesText).toBe(false)
    expect(removeFromFavoritesText).toBe(false)
});

test('When clicking add to favorites text, quote is added to the session storage', async () => {
    const quoteObject = {
        'text': 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.',
        'author': 'E. W. Dijkstra'
    }

    const wrapper = mount(quote, {
        propsData: {
            text: quoteObject.text,
            author: quoteObject.author,
        }
    });

    expect(sessionStorage.length).toBe(0)

    const addToFavoritesText = wrapper.find('.quote-add-favorites');
    await addToFavoritesText.trigger('click')

    expect(sessionStorage.length).toBe(1)

    expect(sessionStorage.getItem('favourite_quote_IFDEBUGGINGISTHEPROC')).toBeTruthy()
    sessionStorage.clear()
});

test('When clicking add to favorites text, quote is added to the session storage when there are already quotes present in the session storage', async () => {
    const quoteObject1 = {
        'text': 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.',
        'author': 'E. W. Dijkstra'
    }
    const quoteObject2 = {
        'text': 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.',
        'author': 'Bill Gates'
    }

    const wrapper1 = mount(quote, {
        propsData: {
            text: quoteObject1.text,
            author: quoteObject1.author,
        }
    });

    const wrapper2 = mount(quote, {
        propsData: {
            text: quoteObject2.text,
            author: quoteObject2.author,
        }
    });

    expect(sessionStorage.length).toBe(0)

    const addToFavoritesText1 = wrapper1.find('.quote-add-favorites');
    await addToFavoritesText1.trigger('click')

    expect(sessionStorage.length).toBe(1)
    expect(sessionStorage.getItem('favourite_quote_IFDEBUGGINGISTHEPROC')).toBeTruthy()

    const addToFavoritesText2 = wrapper2.find('.quote-add-favorites');
    await addToFavoritesText2.trigger('click')

    expect(sessionStorage.length).toBe(2)
    expect(sessionStorage.getItem('favourite_quote_IFDEBUGGINGISTHEPROC')).toBeTruthy()
    expect(sessionStorage.getItem('favourite_quote_MEASURINGPROGRAMMING')).toBeTruthy()
    sessionStorage.clear()
});

test('When clicking add to favorites text and quote already exists in session storage, quote is not added to the session storage', async () => {
    const quoteObject = {
        'text': 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.',
        'author': 'E. W. Dijkstra'
    }

    const wrapper = mount(quote, {
        propsData: {
            text: quoteObject.text,
            author: quoteObject.author,
        }
    });

    expect(sessionStorage.length).toBe(0)

    const addToFavoritesText = wrapper.find('.quote-add-favorites');
    await addToFavoritesText.trigger('click')

    expect(sessionStorage.length).toBe(1)

    await addToFavoritesText.trigger('click')

    expect(sessionStorage.length).toBe(1)
    expect(sessionStorage.getItem('favourite_quote_IFDEBUGGINGISTHEPROC')).toBeTruthy()

    sessionStorage.clear()
});

test('When clicking remove quote from favorites button, quote is removed from session storage', async () => {
    const quoteObject = {
        'text': 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.',
        'author': 'E. W. Dijkstra'
    }
    const sessionQuote = JSON.stringify(quoteObject)
    sessionStorage.setItem('favourite_quote_IFDEBUGGINGISTHEPROC', sessionQuote)

    const wrapper = mount(quote, {
        propsData: {
            text: quoteObject.text,
            author: quoteObject.author,
        }
    });

    expect(sessionStorage.length).toBe(1)

    const removeFromFavoritesText = wrapper.find('.quote-remove-favorites');
    await removeFromFavoritesText.trigger('click');

    expect(sessionStorage.length).toBe(0)

    expect(sessionStorage.getItem('favourite_quote_IFDEBUGGINGISTHEPROC')).toBeFalsy()
    sessionStorage.clear()
});