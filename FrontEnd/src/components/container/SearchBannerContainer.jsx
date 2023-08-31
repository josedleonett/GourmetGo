import SearchBannerDisplay from '../display/SearchBannerDisplay'

const SearchBannerContainer = ({filterList, filterBundle}) => {
  return (
    <SearchBannerDisplay filterList={filterList} filterBundle={filterBundle}/>
  )
}

export default SearchBannerContainer