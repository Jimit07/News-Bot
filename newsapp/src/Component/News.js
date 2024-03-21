import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country: "in",
        pagesize: 9
    }
    static prop = {
        country: PropTypes.string,
        pagesize: PropTypes.number

    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0


        }
        document.title = `News Bot- ${this.props.category}`;

    }

    fetchMoreData = async () => {
        this.setState({page:this.state.page+1})
       const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18871bb56fcb4e4dbb7a165214d0a078&page=${this.state.page}&pageSize=${this.props.pageSize}`
       this.setState({ loading: true });
       let data = await fetch(url);
       let parsedata = await data.json(); 
       this.setState({
           articles: this.state.articles.concat(parsedata.articles),
           totalResults: parsedata.totalResults,
           loading: false
       })
       };
       
    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18871bb56fcb4e4dbb7a165214d0a078&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedata = await data.json();
        this.props.setProgress(70)
        this.setState({
            articles: parsedata.articles,
            totalResults: parsedata.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }
    async componentDidMount() {
        this.updateNews();
    }

    HandlePrevClick = async () => {
        //    {/* let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18871bb56fcb4e4dbb7a165214d0a078&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        //     this.setState({loading:true});
        //     let data
        //       = await fetch(url);
        //     let parsedata = await data.json();
        //     this.setState({
        //         page: this.state.page - 1,
        //         articles: parsedata.articles,
        //         loading:false

        //     })*/}
        this.setState({ page: this.state.page - 1 })

        this.updateNews();

    }
    HandleNextClick = async () => {
        console.log('hi')
        //    {/* let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18871bb56fcb4e4dbb7a165214d0a078&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        //     this.setState({loading:true});
        //     let data
        //       = await fetch(url);
        //     let parsedata = await data.json();
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedata.articles,
        //         loading:false
        //      })*/}
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
 

  
        

    }
    render() {

        return (
            <>
                <h1 className="text-center" style={{ margin: '30px 0px' }}>NewsBot - Top Headline</h1>

                {/* {this.state.loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                    <div className="row" >
                        {{/*!this.state.loading*/ } && this.state.articles?.map((element) => {

                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url}
                                    author={element.author}
                                    date={element.publishedAt} />
                            </div>


                        })}
                    </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.HandlePrevClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.HandleNextClick}>Next &rarr;</button>
                </div> */}


            </>
        )
    }
}
