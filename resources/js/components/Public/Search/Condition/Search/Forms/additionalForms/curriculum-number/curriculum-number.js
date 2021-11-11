import React, {useState, useEffect} from 'react';
import Selects from './select';

function CrriculumNumber(props) {
    const curriculum_numbers_array = [
        [
            ["1-1-1"],
            ["2-1-1"],
            ["2-1-2"],
            ["2-1-3"],
            ["3-1-1"],
            ["4-1-1", "4-1-2", "4-1-3", "4-1-4"],
            ["5-1-1", "8-1-1", "8-2-1", "8-3-1", "8-4-1", "8-5-1", "8-6-1"],
            ["6-1-1", "6-2-1"],
            ["7-1-1"]
        ],
        [
            ["成果物"],
        ]
    ];
    const [curriculum_numbers, setCurriculumNumbers] = useState(["1-1-1"]);
    
    useEffect(() => {
        if (props.category === 0 && props.topic <= 8) {
            setCurriculumNumbers(curriculum_numbers_array[Number(props.category)][Number(props.topic)]);
        } else if (props.category === 1 && props.topic >= 9) {
            setCurriculumNumbers(curriculum_numbers_array[Number(props.category)][0]);
        } else {
            setCurriculumNumbers(curriculum_numbers_array[0][0]);
        }
    }, [props.category, props.topic]);
     
    return (
        <div className="content">
            <Selects
                setCurriculumNumber={ props.setCurriculumNumber }
                curriculum_numbers={ curriculum_numbers }
            />
        </div>
    );
}

export default CrriculumNumber;