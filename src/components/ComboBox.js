import React from 'react';
import axios from 'axios';
import { debounce } from "throttle-debounce";

class ComboBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            character_list: [],
            dropdown_is_expanded: false,
            pseudo_input_is_expanded: false,
            ajax_is_loading: false
        }

        this.handleInputTyping = debounce(500, this.handleInputTyping.bind(this));
    }

    //Marvel API Ajax request
    getMarvelCharacters = (query_string) => {
        
        var self = this;
        if ( query_string !== "" ) { 
            
          this.setState({ajax_is_loading: true});
          //If input not null, request data.
          axios.get('https://gateway.marvel.com:443/v1/public/characters', { 
            params: {
              nameStartsWith: query_string,
              ts: this.props.api.ts,
              apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY,
              hash: this.props.api.hash,
            }
          })
          .then(function(response) { 
            var characters = [];

            //Loop through every response and fetch its name
            response['data']['data']['results'].map(function(character){
              characters.push(character['name']);
              return null; //This has no practical use. It was added to mute a console notice.
            });
            
            self.setState({
                character_list: characters,
                ajax_is_loading: false
            })
          })
        } 
        else {
          self.setState({character_list: [] })
        }
    }

    showDropdown = () => {
        this.setState({
            dropdown_is_expanded: true
        });
    }

    hideDropdown = () => {
        this.setState({
             dropdown_is_expanded: false
        });
    }

    handleInputTyping = (ev) => {
        this.getMarvelCharacters(ev.target.value);
        this.showDropdown();
        this.setState({pseudo_input_is_expanded: false});
    }

    handleOptionClick = (event) => {

        this.hideDropdown();
        this.setState({
            selected_character_name: event.target.innerHTML,
            dropdown_is_expanded: false,
            pseudo_input_is_expanded: true
        })
    }

    handlePseudoInputClick = (e) => {
        this.inputElement.focus();
        this.setState({
            pseudo_input_is_expanded: false
        })
    }

    render() {
        return (
            <div className="combobox">

                {/*AJAX LOADER*/}
                {this.state.ajax_is_loading && (
                    <div className="ajax-loader"><div></div></div>
                )}

                {/*PSEUDO-INPUT*/}
                { /*if*/ this.state.pseudo_input_is_expanded === true && /* then show */
                    (<span className="pseudo-input-display" onClick={this.handlePseudoInputClick.bind(this)}>
                        {this.state.selected_character_name}
                    </span>)
                }
                
                {/*ACTUAL-INPUT*/}
                <input
                    placeholder = "Character Name"
                    id="search_input"
                    ref={input => this.inputElement = input}
                    onChange =  {(event)=>{event.persist(); this.handleInputTyping(event)}}
                />

                {/*DROPDOWN*/}
                { /*if*/ this.state.dropdown_is_expanded && /* then show */
                
                    (<div className="dropdown">
                        {this.state.character_list.map((character_name) => {
                            return (
                                <span 
                                    key={character_name} 
                                    onClick={this.handleOptionClick.bind(this)}
                                > 
                                    {character_name}
                                </span>
                            )
                        })}
                    </div>)
                }

            </div>
        )
    }
}

export default ComboBox;



