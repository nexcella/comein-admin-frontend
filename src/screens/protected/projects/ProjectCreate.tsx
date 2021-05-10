import React, {useCallback} from "react";
import styled, {StyledComponent} from "astroturf";
import {CirclePicker, Color} from 'react-color';
import {useFormik} from "formik";
import {object as yupObject, string as yupString} from "yup";
import {useTranslation} from "react-i18next";
import DatePicker from "react-datepicker";

import {Input} from "../../../components/ui-kit/forms/Input";
import {Button} from "../../../components/ui-kit/Button";
import {observer} from "mobx-react-lite";
import {useProjectsStore} from "../../../providers/StoreProvider";


// ui

const CheckboxContainer: StyledComponent<'span', { active: boolean }> = styled.span`
  min-width: 16px;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  background: lightgrey;
  border: 1px solid darkgray;
  border-radius: 50%;
  opacity: 0.3;
  display: block;
  float: left;

  &.active {
    opacity: 1;
    background: var(--primary-color);
    border: 1px solid var(--support-color);
  }

  &:hover {
    box-shadow: 0 0 2px 0 var(--primary-color);
  }
`

const CheckboxWrapper = styled.div`
  white-space: nowrap;
  margin-bottom: 4px;
  cursor: pointer;
  user-select: none;
`

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const SelectOption: StyledComponent<"div", { selected?: boolean }> = styled.div`
  padding: 12px;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  color: #434343;
  cursor: pointer;

  &:last-child {
    margin-left: 6px;
  }

  &.selected {
    cursor: default;
    background: var(--support-color);
    color: white;
  }
`

const FieldGroup: StyledComponent<"div", { column?: boolean }> = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;

  &.column {
    flex-direction: column;
  }

  & > label {
    margin-right: 12px;
    width: 135px;
    color: #434343
  }

  & > div {
    width: 100%;
  }

  & input {
    margin-top: 0;
  }

  & > span {
    color: #434343
  }

  & > ${CheckboxContainer} {
    margin-right: 12px;
  }
`
//

const CreateProjectWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const ContentWrapper = styled.div`
  margin-top: 12px;
  background: white;
  border-radius: 8px;
  padding: 24px;

  & > h3 {
    white-space: nowrap;
  }

  &:last-child {
    margin-left: 24px;
  }
`

export function Checkbox({active, onClick, text}) {
  return (
    <CheckboxWrapper onClick={onClick}>
      <CheckboxContainer active={active}/>
      {text}
    </CheckboxWrapper>
  )
}

export function Select({options, value, onChange}) {

  const onSelectOption = useCallback((value) => {
    onChange(value)
  }, []);

  return (
    <SelectContainer>
      {options.map((option) => {
        console.debug({value, option})
        return (
          <SelectOption key={option.key} selected={value.key === option.key} onClick={() => onSelectOption(option)}>
            {option.name}
          </SelectOption>
        )
      })}
    </SelectContainer>
  )
}

type ProjectType = {
  key: string,
  name: string
}

type CreateProjectData = {
  title: string,
  projectType: ProjectType,
  options: Map<string, boolean>,
  modules: Map<string, boolean>,
  color?: Color,
};

const projectTypes: ProjectType[] = [
  {key: 'event', name: 'Мероприятие'},
  {key: 'online-marathon', name: 'Онлайн-марафон'}
]

export const ProjectCreateScreen = observer(function ProjectCreateScreen() {
  const {t} = useTranslation();
  const projectsStore = useProjectsStore();
  const validationSchema = yupObject().shape({
    title: yupString().required(t('validation.required')),
  });

  const formik = useFormik<CreateProjectData>({
    validationSchema,
    initialValues: {
      title: '',
      projectType: projectTypes[0],
      color: '#2BC4E7',
      options: new Map<string, boolean>(),
      modules: new Map<string, boolean>(),
    },
    onSubmit: (data) => {
      projectsStore.createProject(data);
    }
  });

  const handleOptionChange = (fieldId: string) => {
    let formOptions = formik.values.options;
    if (formOptions.has(fieldId)) {
      formOptions.delete(fieldId);
    } else {
      formOptions.set(fieldId, true);
    }
    formik.setFieldValue('options', formOptions)
  }

  const handleModulesChange = (module: string) => {
    let formModules = formik.values.modules;
    if (formModules.has(module)) {
      formModules.delete(module);
    } else {
      formModules.set(module, true);
    }
    formik.setFieldValue('modules', formModules)
  }

  return (
    <>
      <h1>Создание нового проекта</h1>
      <form onSubmit={formik.handleSubmit}>
        <CreateProjectWrapper>
          <ContentWrapper>
            <h3>Основная информация</h3>
            <FieldGroup>
              <label>Название</label>
              <div>
                <Input
                  name='title'
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  error={formik.errors.title}
                  showError={formik.touched.title}
                />
              </div>
            </FieldGroup>
            <FieldGroup>
              <label>Тип проекта</label>
              <Select
                options={projectTypes}
                value={formik.values.projectType}
                onChange={(value: ProjectType) => formik.setFieldValue('projectType', value)}
              />
            </FieldGroup>
            <FieldGroup>
              <DatePicker onChange={date => console.debug(date)} />
            </FieldGroup>
            <FieldGroup column={true}>
              <Checkbox
                active={formik.values.options.has('isPublic')}
                onClick={() => handleOptionChange('isPublic')}
                text='Показывать это мероприятие в общем списке'
              />
              <Checkbox
                active={formik.values.options.has('withoutModeration')}
                onClick={() => handleOptionChange('withoutModeration')}
                text='Участники добавляются в проект сами, не дожидаясь моего одбрения'
              />
              <Checkbox
                active={formik.values.options.has('withoutRegistration')}
                onClick={() => handleOptionChange('withoutRegistration')}
                text='Позволить использовать приложение без регистрации'
              />
            </FieldGroup>
            <FieldGroup>
              <label>Цвет мероприятия</label>
              <CirclePicker
                onChange={(color) => {
                  formik.setFieldValue('color', color)
                }}
                color={formik.values.color}
                circleSize={22}
                colors={['#2BC4E7', '#FFDC35', '#FF1A1A', '#3C37FB', '#434343', '#4DD416',]}
              />
            </FieldGroup>
            <Button text='Создать проект'/>
          </ContentWrapper>
          <ContentWrapper>
            <h3>Разделы приложения</h3>
            <Checkbox
              active={formik.values.modules.has('feed')}
              onClick={() => handleModulesChange('feed')}
              text='лента'
            />
            <Checkbox
              active={formik.values.modules.has('info')}
              onClick={() => handleModulesChange('info')}
              text='информация'
            />
          </ContentWrapper>
        </CreateProjectWrapper>
      </form>
    </>
  )
});
