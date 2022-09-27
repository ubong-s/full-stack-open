export default function Search({ searchQuery, handleSearchQuery }) {
   return (
      <div>
         find countries:{' '}
         <input value={searchQuery} onChange={handleSearchQuery} />
      </div>
   );
}
