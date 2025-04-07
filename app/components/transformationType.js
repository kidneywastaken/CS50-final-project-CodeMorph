import React, { useEffect, useState } from "react";
import "./css/styles.css";

export default function TransformationType({ onTransformationSelect, onOptionSelect, onRemoveData }) {
    const [languageData, setLanguageData] = useState(false);
    const [versionData, setVersionData] = useState(true);

    // Removes data for new prompt 
    useEffect(() => {
        if (onRemoveData) {
            const version = document.getElementById("version");
            const language = document.getElementById("language");

            setVersionData(true);
            setLanguageData(false);

            // Sets inputs to default
            version.checked = true;
            language.style.appearance = "none";
            version.style.appearance = "auto";
            language.checked = false;
        }
    }, [onRemoveData])

    // Changes selected option to version
    const onClickVersionHandle = () => {
        const version = document.getElementById("version");
        const language = document.getElementById("language");

        // Submits version as selected
        onTransformationSelect?.(version.value);

        setVersionData(true);
        setLanguageData(false);

        // Sets language as unselected
        version.checked = true;
        language.style.appearance = "none";
        version.style.appearance = "auto";
        language.checked = false;
    }

    // Changes selected option to language
    const  onLanguageClickHandle = () => {
        const version = document.getElementById("version");
        const language = document.getElementById("language");

        // Submits language as selected
        onTransformationSelect?.(language.value);

        setVersionData(false);
        setLanguageData(true);

        // Sets version as unselected
        version.style.appearance = "none";
        language.style.appearance = "auto";
        version.checked = false;
        language.checked = true;
    }

    // Submits selected version option 
    const handleVersionInputChange = () => {
        const versionInput = document.getElementById("versionInput");
        onOptionSelect?.(versionInput.value);
    }

    // Submits selected language option 
    const handleLanguageInputChange = () => {
        const LanguageInput = document.getElementById("LanguageSelect");
        onOptionSelect?.(LanguageInput.value);
    }

  return (
    <div className="" style={{position: "relative"}}>
        <h4 className="mb-2 m-2">Transformation Type</h4>

        <div className="flex items-center space-x-2 m-2 mb-2">
            <div className="space-x-2" 
                onClick={onClickVersionHandle}
                style={{position: "relative"}}
            >
                <input id="version" type='radio' value="version" defaultChecked></input>
                <label>Update Version</label>
            </div>

            {!versionData ? (<></>) : ( <div>
                                        <input type="text" placeholder="2.0.0" autoFocus className="input" onChange={handleVersionInputChange} id="versionInput"/>
                                    </div>)}
        </div>

        <div className="flex items-center space-x-2 m-2 mt-2">
            <div className="space-x-2" 
                onClick={onLanguageClickHandle}
                style={{position: "relative"}}
            >
                <input id="language" type='radio' value="language"></input>
                <label>Change Language</label>
            </div>
            {!languageData ? (<></>) : (<div>
                                        <select id="LanguageSelect" className="input" onChange={handleLanguageInputChange}>
                                            <option defaultValue hidden> Select </option>
                                            <option value="PHP">PHP</option>
                                            <option value="C++">C++</option>
                                            <option value="Python">Python</option>
                                            <option value="JavaScript">JavaScript</option>
                                            <option value="TypeScript">TypeScript</option>
                                            <option value="Java">Java</option>
                                        </select>                            
                                    </div>)}
            
        </div>
    </div>
  );
};