import Title from "./Title";
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

export const addNewTaskDriver = () => {
    let wrapper: Enzyme.ReactWrapper;

    return {
        getTitleText: (inputWrapper = wrapper) => inputWrapper.find("h1").text(),
        createTitle: (doneTasks: number, totalTasks: number) => {
            wrapper = mount(<Title totalTasks={totalTasks} doneTasks={doneTasks} />);
        }
    }
}
