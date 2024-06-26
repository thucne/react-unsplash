import React from "react";
export interface SearchInputProps {
    search: string;
    setSearch: (value: string) => void;
    loading: boolean;
    isPopUp?: boolean;
    handleClose?: () => void;
    onCommit?: (value: string) => void;
}
declare const SearchInput: ({ search, setSearch, loading, isPopUp, handleClose, onCommit, }: SearchInputProps) => React.JSX.Element;
export default SearchInput;
//# sourceMappingURL=SearchInput.d.ts.map