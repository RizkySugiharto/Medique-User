import React, { createRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import StepsHeaderBar from '../components/StepsHeaderBar';
import LabeledInput from '../components/LabeledInput';
import LabeledRadioGroup from '../components/LabeledRadioGroup';
import Button from '../components/Button';
import LabeledSelect from '../components/LabeledSelect';

type RequiredField = 'symptoms' | 'durationSymptoms'

function OrderDoctorFirstStepScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [symptoms, setSymptoms] = useState('');
  const [durationSymptoms, setDurationSymptoms] = useState(0);
  const [additionalSymptoms, setAdditionalSymptoms] = useState('');
  const [severity, setSeverity] = useState('0');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [requiredFields, setRequiredFields] = useState<RequiredField[]>([]);
  const scrollView = createRef<ScrollView>()
  
  return (
    <View style={styles.screenContainer}>
      <StepsHeaderBar
        label='Pemesanan Dokter'
        message='Langkah awal: tulis gejala kamu'
        step={1}
        maxSteps={7}/>
      <View style={{ height: 12, opacity: 0, }} />
      <ScrollView
        ref={scrollView}
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}>
        <View style={{ height: 20, opacity: 0, }} />
        <LabeledInput
          name='Gejala : '
          placeholder='Deskripsikan gejala yang dialami'
          multiline={true}
          value={symptoms}
          setValue={setSymptoms}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputText}/>
        { requiredFields.includes('symptoms') && <Text style={styles.requiredMessage}>Harus di isi</Text> }
        <View style={{ height: 36 }} />
        <LabeledSelect
          data={[
            { name: '1-24 jam', value: '1-24 jam' },
            { name: '1 hari', value: '1 hari' },
            { name: '2 hari', value: '2 hari' },
            { name: '3 hari', value: '3 hari' },
            { name: '4 hari', value: '4 hari' },
            { name: '5 hari', value: '5 hari' },
            { name: '6 hari', value: '6 hari' },
            { name: 'lebih dari seminggu', value: 'lebih dari seminggu' },
          ]}
          name='Durasi Gejala : '
          placeholder='Deskripsikan gejala yang dialami'
          value={durationSymptoms}
          setValue={setDurationSymptoms}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputText}
          placeholderStyle={styles.inputText}
          itemStyle={styles.inputText}/>
        { requiredFields.includes('durationSymptoms') && <Text style={styles.requiredMessage}>Harus di isi</Text> }
        <View style={{ height: 36 }} />
        <LabeledInput
          name='Gejala tambahan : '
          placeholder='Apakah ada gejala lain yang menyertai?'
          multiline={true}
          value={additionalSymptoms}
          setValue={setAdditionalSymptoms}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputText}/>
        <Text style={styles.skipMessage}>jika tidak ada maka lewati</Text>
        <View style={{ height: 36 }} />
        <LabeledRadioGroup
          name='Tingkat keparahan:'
          radioProps={[
            { label: "Ringan", value: 'R' },
            { label: "Sedang", value: 'S' },
            { label: "Berat", value: 'B' },
          ]}
          value={severity}
          setValue={setSeverity}
          />
        <View style={{ height: 36 }} />
        <LabeledInput
          name='Riwayat kesehatan : '
          placeholder='Anda memiliki riwayat pnyakit?'
          multiline={true}
          value={medicalHistory}
          setValue={setMedicalHistory}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputText}/>
        <Text style={styles.skipMessage}>jika tidak ada maka lewati</Text>
        <View style={{ height: 60 }} />
        <Button
          label='Lanjut'
          onPress={() => {
            const newRequiredFields: RequiredField[] = []
            if (!symptoms) { newRequiredFields.push('symptoms') }
            if (!durationSymptoms) { newRequiredFields.push('durationSymptoms') }
            if (newRequiredFields.length > 0) {
              setRequiredFields(newRequiredFields)
              scrollView.current?.scrollTo({
                y: 0,
                animated: true
              })
            } else {
              setRequiredFields([])
              navigation.navigate('OrderDoctorSecondStep' as never)
            }
          }}
          />
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 24,
  },
  skipMessage: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: Colors.textColorSecondary,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  requiredMessage: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  inputLabel: {
    marginBottom: 10,
  },
  inputText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    includeFontPadding: false,
  }
});

export default OrderDoctorFirstStepScreen;