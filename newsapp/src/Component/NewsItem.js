import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title , description,imageurl, newsurl,author,date}= this.props;
        return (
            <div>
                <div className="card" >
                    <img src={!imageurl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGKRXi91DHSQBhdOYUs5rokRvQq1jDg1vtA&usqp=CAU":imageurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
                )
  }
}
