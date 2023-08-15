import React from 'react'
import SearchBannerDisplay from '../display/SearchBannerDisplay'

const SearchBannerContainer = ({filterList}) => {
  return (
    <SearchBannerDisplay filterList={filterList}/>
  )
}

export default SearchBannerContainer