import { useTranslation } from 'react-i18next';

export default function LanguageDropdown() {
    const { i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <div className="mx-2 w-auto text-[black] bg-none">

            <select
                className="form-select bg-red-700 rounded-sm items-center align-middle justify-center outline-none "
                id="language-dropdown"
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
            >
                <option value="en">Eng</option>
                <option value="am">አማርኛ</option>
                <option value="om">Afaan</option>
            </select>
        </div>
    );
}
