import ColumnWrapper from "./components/ColumnWrapper";
import ColumnsGrid from "./components/ColumnsGrid";
import ProductsColumns from "./features/products/ProductsColumn";
import SelectedProducts from "./features/selectedProducts/SelectedProductsColumns";
import UsersColumns from "./features/users/UsersColumn";

function App() {
  return (
    <>
      <ColumnWrapper header="Explore products and users">
        <ColumnsGrid>
          <ProductsColumns />
          <UsersColumns />
          <SelectedProducts />
        </ColumnsGrid>
      </ColumnWrapper>
    </>
  );
}

export default App;
