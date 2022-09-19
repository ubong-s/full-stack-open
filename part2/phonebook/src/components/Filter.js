const Filter = ({ search, handleFilter }) => {
   return (
      <div>
         Filter shown with <input value={search} onChange={handleFilter} />
      </div>
   );
};

export default Filter;
