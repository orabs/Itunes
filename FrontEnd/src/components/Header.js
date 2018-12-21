import React from 'react';
import emitter from '../emitter';
import type {HeaderState, SearchOption} from '../type';
import '../style/Header.scss';

// Search categories
const options: Array<SearchOption> = [
    'All',
    'Music',
    'Movie',
];

class Header extends React.PureComponent<{}, HeaderState> {
    emitSearch: () => void;
    _onClick: (e: Object) => void;
    SearchMedia: (e: Object) => Function;

    // Will contain the 10 top results
    suggestionsListComponent: any;


    state: HeaderState = {
        media: 'All',
        query: '',
        resultsHistory: []

    };

    constructor(props: Object) {

        super(props);

        // Generate event to update the  'Container' Component when the search button was clicked
        this.emitSearch = () => emitter.emit('search', this.state);


        let resultsHistory = {};

        // Get top searched results
        resultsHistory = JSON.parse(localStorage.getItem('history'));
        resultsHistory = this.sortProperties(resultsHistory);
        this.state = {
            resultsHistory: resultsHistory,
            media: this.state.media,
            query: this.state.query
        }
        this.parseSuggestion();

    }


    //  Search query on state and show results
    SearchMedia() {
        if (this.state.query) {
            this.emitSearch();
            this.StorageManager();
            let resultsHistory = JSON.parse(localStorage.getItem('history'));
            resultsHistory = this.sortProperties(resultsHistory);
            this.setState({resultsHistory: resultsHistory});
            this.parseSuggestion();
        }
    }

    StorageManager() {
        let resultsHistory = {};
        resultsHistory = JSON.parse(localStorage.getItem('history'));
        let keyWord = this.state.query;
        if (resultsHistory) {
            resultsHistory[keyWord] ? resultsHistory[keyWord] += 1 : resultsHistory[keyWord] = 1;
            localStorage.setItem('history', JSON.stringify(
                resultsHistory
            ));
        } else {
            let tempObj = {};
            tempObj[keyWord] = 1
            localStorage.setItem('history', JSON.stringify(
                tempObj
            ));
        }
        resultsHistory = this.sortProperties(resultsHistory);
        this.setState({resultsHistory: resultsHistory})
    }


    // Search Button Handler
    _onClick(e) {
        console.log(e.currentTarget.value);
        this.setState(
            {media: e.currentTarget.value},
            () => (this.state.query.length ? this.emitSearch() : null)
        );
    }


    // update the search query on state to the input value or for the selected suggestion
    async updateInputData(event) {
        if (event.target.value)
            this.setState({query: event.target.value})
        else if (event.target.innerText) {
            await this.setState({query: event.target.innerText});
            await console.log(this.state.query)
            await this.SearchMedia();
        }
    }

    // Create the options elements of the categories on select
    renderSearchOption = () => options.map(opt =>
        <option
            key={opt}
            value={opt}>{opt}
        </option>);


    // create list of the top searched results
    parseSuggestion() {
        if (this.state.resultsHistory.length) {
            this.suggestionsListComponent = ( <ul className="suggestions"> {
                    this.state.resultsHistory.map((suggestion, index) => {
                        return ( <li
                                className="suggestion waves-effect "
                                key={suggestion}
                                onClick={this.updateInputData.bind(this)}>
                                {suggestion} </li>
                        );
                    })
                } </ul>
            );
        }
    }

    // Sort the array from local storage by the most searched key word
    sortProperties(obj) {
        // convert object into array
        var sortable = [];
        for (var key in obj)
            if (obj.hasOwnProperty(key))
                sortable.push([key, obj[key]]); // each item is an array in format [key, value]

        // sort items by value
        sortable.sort(function (a, b) {
            var x = a[1],
                y = b[1];
            return x < y ? -1 : x > y ? 1 : 0;
        });
        let pureArray = [];
        sortable.map((item) => {
            pureArray.push(item[0]);
        })
        return pureArray.reverse().slice(0, 10) // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
    }


    render() {
        return (

            <div className="header-div">
                {
                    this.parseSuggestion()
                }
                <nav>
                    <div className="nav-div">
                        <div className="nav-wrapper search-input">
                            <button className="btn waves-effect waves-light"
                                    onClick={
                                        this.SearchMedia.bind(this)
                                    }>Search
                            </button>
                            <div className="header-search-wrapper">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="search-input white black-text"
                                    onChange={
                                        this.updateInputData.bind(this)
                                    }
                                />
                                {
                                    this.suggestionsListComponent
                                }

                            </div>


                            <select className="combo" onChange={this._onClick.bind(this)}>
                                {this.renderSearchOption()}
                            </select>
                        </div>
                    </div>
                </nav>
            </div>
        );


    }
}

export default Header;
