export default function SidebarFilters() {
  return (
    <aside className="w-64 p-4 border-r">
      <h2 className="font-bold mb-2">Filtres</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Catégories</h3>
        <ul>
          <li><input type="checkbox" /> Lifestyle</li>
          <li><input type="checkbox" /> Running</li>
          <li><input type="checkbox" /> Basketball</li>
          <li><input type="checkbox" /> Football</li>
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Prix</h3>
        <ul>
          <li><input type="radio" name="price" /> 0 - 50 €</li>
          <li><input type="radio" name="price" /> 50 - 100 €</li>
          <li><input type="radio" name="price" /> 100 - 150 €</li>
        </ul>
      </div>
    </aside>
  );
}
