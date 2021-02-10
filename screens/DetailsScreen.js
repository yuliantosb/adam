import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import colors from '../config/colors';
import Feather from 'react-native-vector-icons/Feather';
import Ruler from '../assets/icons/ruler.svg';
import Svg, {Path} from 'react-native-svg';
import Badge from '../assets/icons/badge.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {height, width} = Dimensions.get('window');

const carousels = [
  require('../images/iris-27.jpg'),
  require('../images/iris-30.jpg'),
  require('../images/iris-36.jpg'),
  require('../images/iris-1.jpg'),
  require('../images/iris-10.jpg'),
  require('../images/iris-15.jpg'),
  require('../images/iris-21.jpg'),
];

export default function DetailsScreen({navigation}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [payType, setPayType] = useState('installment');
  const [month, setMonth] = useState(24);

  const Carousel = ({item}) => {
    return (
      <>
        <Image source={item} style={styles.imageCarousel} />
      </>
    );
  };

  const Pagination = ({scrollX}) => {
    const translateX = scrollX.interpolate({
      inputRange: [-width, 0, width],
      outputRange: [-10, 0, 10],
    });

    return (
      <View style={styles.carouselBulletsWrapper}>
        <Animated.View
          style={[
            styles.carouselActiveBulletWrapper,
            {
              transform: [
                {
                  translateX,
                },
              ],
            },
          ]}>
          <View style={styles.carouselActiveBullet} />
        </Animated.View>
        {carousels.map((data, index) => {
          return (
            <View key={index} style={styles.carouselBulletsContainer}>
              <View style={styles.carouselBullets} />
            </View>
          );
        })}
      </View>
    );
  };

  const Footer = ({item}) => {
    return (
      <View
        style={{
          borderRadius: 5,
          backgroundColor: '#fff',
          padding: 10,
          marginHorizontal: 10,
        }}>
        <View>
          <View style={styles.carouselLike}>
            <Feather name="heart" size={24} style={styles.carouselIcon} />
          </View>
          <Image
            // fadeDuration={0}
            source={require('../images/iris-1.jpg')}
            style={{
              borderRadius: 5,
              width: width / 1.5,
              height: 150,
              resizeMode: 'cover',
            }}
          />
          <View style={styles.footerTitleWrapper}>
            <Text style={styles.footerTitle}>{item.title}</Text>
            <Text style={styles.footerSubtitle}>{item.subtitle}</Text>
          </View>
          <View style={styles.footerDescription}>
            <View style={styles.footerDescriptionWrapper}>
              <Text style={styles.footerDescriptionTitle}>{item.year}</Text>
              <Text style={styles.footerDescriptionSubtitle}>موديل</Text>
            </View>
            <View
              style={[
                styles.footerDescriptionWrapper,
                styles.footerDescriptionWrapperBordered,
              ]}>
              <Text style={styles.footerDescriptionTitle}>{item.variant}</Text>
              <Text style={styles.footerDescriptionSubtitle}>فئة</Text>
            </View>
            <View style={styles.footerDescriptionWrapper}>
              <Text style={styles.footerDescriptionTitle}>{item.kms}</Text>
              <Text style={styles.footerDescriptionSubtitle}>كيلومتر</Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <TouchableOpacity style={styles.bar}>
              <Text style={styles.barTitle}>{item.price}</Text>
              <Text style={styles.barSubtitle}>EGP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>هيونــــداى</Text>
          <Text style={styles.subtitle}>إلينتــــرا</Text>
        </View>
        <TouchableOpacity
          style={styles.bar}
          onPress={() => navigation.navigate('Image')}>
          <Text style={styles.barTitle}>185,000</Text>
          <Text style={styles.barSubtitle}>EGP</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.carousel}>
          <View style={styles.carouselLike}>
            <Feather name="heart" size={24} style={styles.carouselIcon} />
          </View>
          <Animated.FlatList
            data={carousels}
            keyExtractor={(data, index) => index.toString()}
            renderItem={({item, index}) => (
              <Carousel item={item} index={index} scrollX={scrollX} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={60}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              {
                useNativeDriver: true,
              },
            )}
          />
          <Pagination scrollX={scrollX} />
        </View>

        <View
          style={[
            styles.content,
            {
              backgroundColor: payType === 'cash' ? colors.primary : '#fff',
            },
          ]}>
          <View style={styles.card}>
            <View
              style={[
                styles.cardWrapper,
                {
                  alignItems: 'flex-end',
                },
              ]}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setPayType('cash')}>
                {payType === 'cash' && (
                  <Feather name="check" size={16} style={styles.checkboxIcon} />
                )}
              </TouchableOpacity>
              <Text
                style={[
                  styles.title,
                  {color: payType == 'cash' ? '#fff' : colors.textColor},
                ]}>
                كاش
              </Text>
            </View>
            <View
              style={[
                styles.cardWrapper,
                {
                  alignItems: 'flex-end',
                },
              ]}>
              <Text
                style={[
                  styles.headerText,
                  {color: payType == 'cash' ? '#fff' : colors.textColor},
                ]}>
                185,000
              </Text>
              <Text
                style={[
                  styles.smallText,
                  {color: payType == 'cash' ? '#fff' : colors.textColor},
                ]}>
                EGP
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.content,
            {
              backgroundColor:
                payType === 'installment' ? colors.primary : '#fff',
            },
          ]}>
          <View style={styles.card}>
            <View style={styles.cardWrapper}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setPayType('installment')}>
                {payType === 'installment' && (
                  <Feather name="check" size={16} style={styles.checkboxIcon} />
                )}
              </TouchableOpacity>
              <Text
                style={[
                  styles.title,
                  {color: payType == 'installment' ? '#fff' : colors.textColor},
                ]}>
                تقسيط
              </Text>
            </View>
            <View style={styles.expandedCard}>
              <Ruler />
              <View style={styles.bubbleCardWrapper}>
                <View style={styles.bubbleCard}>
                  <Svg
                    style={styles.bubbleArrow}
                    width="23"
                    height="26"
                    viewBox="0 0 23 26">
                    <Path d="M0 13L22.5 0.00961876V25.9904L0 13Z" fill="#fff" />
                  </Svg>
                  <Text style={styles.bubbleTitle}>15,000</Text>
                  <Text style={styles.bubbleSubtitle}>EGP</Text>
                </View>
                <Text style={[styles.title, {color: '#fff'}]}>المقدم</Text>
              </View>
            </View>
          </View>
          <View style={styles.priceSelection}>
            <TouchableOpacity
              style={[
                styles.badge,
                month === 12 ? styles.badgeActive : styles.badgeInactive,
              ]}
              onPress={() => setMonth(12)}>
              <Text
                style={[
                  styles.badgeTitle,
                  month === 12 && {color: colors.textColor},
                ]}>
                12
              </Text>
              <Text
                style={[
                  styles.badgeSubtitle,
                  month === 12 && {color: colors.textColor},
                ]}>
                Month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.badge,
                month === 24 ? styles.badgeActive : styles.badgeInactive,
              ]}
              onPress={() => setMonth(24)}>
              <Text
                style={[
                  styles.badgeTitle,
                  month === 24 && {color: colors.textColor},
                ]}>
                24
              </Text>
              <Text
                style={[
                  styles.badgeSubtitle,
                  month === 24 && {color: colors.textColor},
                ]}>
                Month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.badge,
                month === 36 ? styles.badgeActive : styles.badgeInactive,
              ]}
              onPress={() => setMonth(36)}>
              <Text
                style={[
                  styles.badgeTitle,
                  month === 36 && {color: colors.textColor},
                ]}>
                36
              </Text>
              <Text
                style={[
                  styles.badgeSubtitle,
                  month === 36 && {color: colors.textColor},
                ]}>
                Month
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerCard}>
            <View style={styles.footerCardWrapper}>
              <Text style={styles.footerCardTitle}>3,500</Text>
              <Text style={styles.footerCardSubtitle}>EGP</Text>
            </View>
            <Text style={styles.text}>قسط شهري</Text>
          </View>
        </View>
        <View style={styles.polygonContent}>
          <View style={styles.polygonWrapper}>
            <Svg width="88" height="98" viewBox="0 0 88 98" fill="none">
              <Path
                d="M39.25 2.32a9.5 9.5 0 019.5 0l33.301 19.226a9.5 9.5 0 014.75 8.227v38.454a9.5 9.5 0 01-4.75 8.227L48.75 95.68a9.5 9.5 0 01-9.5 0L5.949 76.454a9.5 9.5 0 01-4.75-8.227V29.773a9.5 9.5 0 014.75-8.227L39.25 2.32z"
                fill="#EEF1FE"
                stroke="#B9C0FB"
              />
              <View style={styles.polygon}>
                <Text style={styles.titlePolygonMontserrat}>210,000</Text>
                <Text style={styles.subtitlePolygon}>كيلومتر</Text>
              </View>
            </Svg>
          </View>
          <View style={styles.polygonWrapper}>
            <Svg width="88" height="98" viewBox="0 0 88 98" fill="none">
              <Path
                d="M39.25 2.32a9.5 9.5 0 019.5 0l33.301 19.226a9.5 9.5 0 014.75 8.227v38.454a9.5 9.5 0 01-4.75 8.227L48.75 95.68a9.5 9.5 0 01-9.5 0L5.949 76.454a9.5 9.5 0 01-4.75-8.227V29.773a9.5 9.5 0 014.75-8.227L39.25 2.32z"
                fill="#EEF1FE"
                stroke="#B9C0FB"
              />
              <View style={styles.polygon}>
                <Text style={styles.titlePolygon}>هايلاين</Text>
                <Text style={styles.subtitlePolygon}>فئة</Text>
              </View>
            </Svg>
          </View>
          <View style={styles.polygonWrapper}>
            <Svg width="88" height="98" viewBox="0 0 88 98" fill="none">
              <Path
                d="M39.25 2.32a9.5 9.5 0 019.5 0l33.301 19.226a9.5 9.5 0 014.75 8.227v38.454a9.5 9.5 0 01-4.75 8.227L48.75 95.68a9.5 9.5 0 01-9.5 0L5.949 76.454a9.5 9.5 0 01-4.75-8.227V29.773a9.5 9.5 0 014.75-8.227L39.25 2.32z"
                fill="#EEF1FE"
                stroke="#B9C0FB"
              />
              <View style={styles.polygon}>
                <Text style={styles.titlePolygonMontserrat}>2013</Text>
                <Text style={styles.subtitlePolygon}>موديل</Text>
              </View>
            </Svg>
          </View>
        </View>
        <View style={styles.polygonContent}>
          <View style={styles.polygonWrapper}>
            <Svg width="88" height="98" viewBox="0 0 88 98" fill="none">
              <Path
                d="M39.25 2.32a9.5 9.5 0 019.5 0l33.301 19.226a9.5 9.5 0 014.75 8.227v38.454a9.5 9.5 0 01-4.75 8.227L48.75 95.68a9.5 9.5 0 01-9.5 0L5.949 76.454a9.5 9.5 0 01-4.75-8.227V29.773a9.5 9.5 0 014.75-8.227L39.25 2.32z"
                fill="#EEF1FE"
                stroke="#B9C0FB"
              />
              <View style={styles.polygon}>
                <Text style={styles.titlePolygon}>مانيوال</Text>
                <Text style={styles.subtitlePolygon}>الفتيس</Text>
              </View>
            </Svg>
          </View>
          <View style={styles.polygonWrapper}>
            <Svg width="88" height="98" viewBox="0 0 88 98" fill="none">
              <Path
                d="M39.25 2.32a9.5 9.5 0 019.5 0l33.301 19.226a9.5 9.5 0 014.75 8.227v38.454a9.5 9.5 0 01-4.75 8.227L48.75 95.68a9.5 9.5 0 01-9.5 0L5.949 76.454a9.5 9.5 0 01-4.75-8.227V29.773a9.5 9.5 0 014.75-8.227L39.25 2.32z"
                fill="#EEF1FE"
                stroke="#B9C0FB"
              />
              <View style={styles.polygon}>
                <Text style={styles.titlePolygon}>أحمــر</Text>
                <Text style={styles.subtitlePolygon}>اللون</Text>
              </View>
            </Svg>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.bigText}>المواصفات</Text>
        </View>
        <View>
          <View style={[styles.tableRow, styles.tableRowOdd]}>
            <Text style={[styles.tableTitle, styles.almaraiText]}>
              سعة المحرك
            </Text>
            <Text style={[styles.tableTitle, styles.montserratText]}>
              1600 CC
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableTitle, styles.almaraiText]}>
              عدد السليندرات
            </Text>
            <Text style={[styles.tableTitle, styles.montserratText]}>8</Text>
          </View>
          <View style={[styles.tableRow, styles.tableRowOdd]}>
            <Text style={[styles.tableTitle, styles.almaraiText]}>
              عدد الصبابات
            </Text>
            <Text style={[styles.tableTitle, styles.montserratText]}>16</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableTitle, styles.almaraiText]}>
              نوع الحركة
            </Text>
            <Text style={[styles.tableTitle, styles.almaraiText]}>
              جر أمامى
            </Text>
          </View>
          <View style={[styles.tableRow, styles.tableRowOdd]}>
            <Text style={[styles.tableTitle, styles.almaraiText]}>
              نوع الحقن
            </Text>
            <Text style={[styles.tableTitle, styles.almaraiText]}>
              إلكترونى
            </Text>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.bigText}>حالة السيارة</Text>
          <Badge />
        </View>
        <View style={styles.badgeContent}>
          <Text style={styles.badgeText}>هذه السيارة بضمان سعر دوت كوم</Text>
          <Text style={styles.badgeSubText}>
            سيارات سعر دوت كوم هي سيارات تم فحصهاوالتأكد من توافر أعلى مستويات
            الجودة فيها
          </Text>
        </View>
        <View style={styles.accordionWrapper}>
          <View style={styles.accordion}>
            <Feather name="chevron-left" size={24} style={{color: '#B9BACE'}} />
            <Text style={styles.badgeText}>التقرير الفني للسيارة</Text>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.bigText}>الكماليات</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            marginVertical: 20,
          }}>
          <View
            style={{
              position: 'relative',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Svg
              style={{marginLeft: 20}}
              width="36"
              height="40"
              viewBox="0 0 36 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M20.375 1.65988L32.6955 8.77313C34.1652 9.62164 35.0705 11.1897 35.0705 12.8868V27.1132C35.0705 28.8103 34.1652 30.3784 32.6955 31.2269L20.375 38.3401C18.9053 39.1886 17.0947 39.1886 15.625 38.3401L3.30449 31.2269C1.83484 30.3784 0.929491 28.8103 0.929491 27.1132V12.8868C0.929491 11.1897 1.83484 9.62164 3.30449 8.77313L15.625 1.65988C17.0947 0.811376 18.9053 0.811376 20.375 1.65988Z"
                fill="#EEF1FE"
                stroke="#B9C0FB"
                stroke-width="0.5"
              />

              <Ionicons
                name="musical-notes-outline"
                size={20}
                style={{
                  color: colors.primary,
                  alignSelf: 'center',
                  marginTop: 8,
                }}
              />
            </Svg>
            <Text style={[styles.badgeText, {color: colors.primary}]}>
              نظام صوت سونى
            </Text>
          </View>

          <View
            style={{
              position: 'relative',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Svg
              style={{marginLeft: 20}}
              width="36"
              height="40"
              viewBox="0 0 36 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M20.375 1.65988L32.6955 8.77313C34.1652 9.62164 35.0705 11.1897 35.0705 12.8868V27.1132C35.0705 28.8103 34.1652 30.3784 32.6955 31.2269L20.375 38.3401C18.9053 39.1886 17.0947 39.1886 15.625 38.3401L3.30449 31.2269C1.83484 30.3784 0.929491 28.8103 0.929491 27.1132V12.8868C0.929491 11.1897 1.83484 9.62164 3.30449 8.77313L15.625 1.65988C17.0947 0.811376 18.9053 0.811376 20.375 1.65988Z"
                fill="#EEF1FE"
                stroke="#B9C0FB"
                stroke-width="0.5"
              />

              <Ionicons
                name="bluetooth-outline"
                size={20}
                style={{
                  color: colors.primary,
                  alignSelf: 'center',
                  marginTop: 8,
                }}
              />
            </Svg>
            <Text style={[styles.badgeText, {color: colors.primary}]}>
              بلوتــــوث
            </Text>
          </View>

          <View
            style={{
              position: 'relative',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Svg
              style={{marginLeft: 20}}
              width="36"
              height="40"
              viewBox="0 0 36 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M20.375 1.65988L32.6955 8.77313C34.1652 9.62164 35.0705 11.1897 35.0705 12.8868V27.1132C35.0705 28.8103 34.1652 30.3784 32.6955 31.2269L20.375 38.3401C18.9053 39.1886 17.0947 39.1886 15.625 38.3401L3.30449 31.2269C1.83484 30.3784 0.929491 28.8103 0.929491 27.1132V12.8868C0.929491 11.1897 1.83484 9.62164 3.30449 8.77313L15.625 1.65988C17.0947 0.811376 18.9053 0.811376 20.375 1.65988Z"
                fill="#EEF1FE"
                stroke="#B9C0FB"
                stroke-width="0.5"
              />

              <MaterialCommunityIcons
                name="steering"
                size={20}
                style={{
                  color: colors.primary,
                  alignSelf: 'center',
                  marginTop: 8,
                }}
              />
            </Svg>
            <Text style={[styles.badgeText, {color: colors.primary}]}>
              طارة جلـــد
            </Text>
          </View>

          <View
            style={{
              position: 'relative',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Svg
              style={{marginLeft: 20}}
              width="36"
              height="40"
              viewBox="0 0 36 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M20.375 1.65988L32.6955 8.77313C34.1652 9.62164 35.0705 11.1897 35.0705 12.8868V27.1132C35.0705 28.8103 34.1652 30.3784 32.6955 31.2269L20.375 38.3401C18.9053 39.1886 17.0947 39.1886 15.625 38.3401L3.30449 31.2269C1.83484 30.3784 0.929491 28.8103 0.929491 27.1132V12.8868C0.929491 11.1897 1.83484 9.62164 3.30449 8.77313L15.625 1.65988C17.0947 0.811376 18.9053 0.811376 20.375 1.65988Z"
                fill="#EEF1FE"
                stroke="#B9C0FB"
                stroke-width="0.5"
              />

              <Feather
                name="circle"
                size={20}
                style={{
                  color: colors.primary,
                  alignSelf: 'center',
                  marginTop: 8,
                }}
              />
            </Svg>
            <Text style={[styles.badgeText, {color: colors.primary}]}>
              كاميرا خلفية
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.bigText}>سيارة مشابهة</Text>
        </View>
        <View>
          <View style={styles.footerContent}>
            <FlatList
              data={[
                {
                  title: 'كيـــا',
                  subtitle: 'سيراتو',
                  year: '2018',
                  variant: 'هايلاين',
                  kms: '350,000',
                  price: '235,000',
                },
                {
                  title: 'نيســـان',
                  subtitle: 'سينترا',
                  year: '2020',
                  variant: 'الأولى',
                  kms: '110,000',
                  price: '310,000',
                },
              ]}
              contentContainerStyle={{paddingHorizontal: 10}}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <Footer item={item} scrollX={scrollX} />}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.stickFooter}>
        <View style={styles.stickFooterLeft}>
          <Image
            source={require('../images/car-1.png')}
            style={{width: 100, height: 60, resizeMode: 'contain'}}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.title}>هيونــــداى</Text>
            <Text style={styles.subtitle}>إلينتــــرا</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.stickButton}>
          <Feather name="minus" size={24} style={{color: colors.primary}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bar: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    backgroundColor: colors.lightBackground,
    padding: 15,
    flexDirection: 'row',
  },
  barTitle: {
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
    marginRight: 5,
  },
  barSubtitle: {
    fontFamily: 'Montserrat-Light',
    color: colors.primary,
  },
  title: {
    fontFamily: 'Almarai-Bold',
    color: colors.textColor,
  },
  subtitle: {
    fontFamily: 'Almarai-Regular',
    color: colors.textColor,
  },
  carousel: {
    position: 'relative',
    marginBottom: 20,
  },
  imageCarousel: {
    width,
    height: height / 4,
  },
  carouselLike: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
  },
  carouselIcon: {
    color: '#fff',
    elevation: 1,
  },
  carouselBulletsWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 2,
    flexDirection: 'row',
    height: 10,
  },
  carouselBulletsContainer: {
    width: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselBullets: {
    width: 5,
    height: 5,
    borderRadius: 10,
    opacity: 0.2,
    backgroundColor: '#fff',
  },
  carouselActiveBulletWrapper: {
    marginRight: -10,
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselActiveBullet: {
    width: 3,
    height: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 1,
  },

  card: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },

  cardWrapper: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: colors.textColor,
  },
  smallText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Light',
    color: colors.textColor,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: colors.borderColor,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxIcon: {
    color: '#fff',
  },
  expandedCard: {
    height: height / 3,
    backgroundColor: colors.primary,
    position: 'relative',
  },
  priceSelection: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  badge: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 10,
    alignItems: 'flex-end',
  },
  badgeActive: {
    backgroundColor: '#fff',
  },
  badgeInactive: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,.5)',
  },
  badgeTitle: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    marginRight: 5,
  },
  badgeSubtitle: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'Montserrat-Light',
  },
  footerCard: {
    alignItems: 'center',
  },
  footerCardWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  footerCardTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#fff',
    marginRight: 5,
  },
  footerCardSubtitle: {
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    fontSize: 14,
  },
  text: {
    fontFamily: 'Almarai-Regular',
    color: '#fff',
  },
  bubbleCardWrapper: {
    position: 'absolute',
    width: width - 60,
    flexDirection: 'row',
    alignItems: 'center',
    top: height / 8,
  },
  bubbleCard: {
    position: 'relative',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexWrap: 'wrap',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 50,
  },
  bubbleTitle: {
    fontFamily: 'Montserrat-Bold',
    color: colors.textColor,
    fontSize: 18,
    marginRight: 5,
  },
  bubbleSubtitle: {
    fontFamily: 'Montserrat-Regular',
    color: colors.textColor,
  },
  bubbleArrow: {
    position: 'absolute',
    left: -10,
  },
  polygonContent: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  polygonWrapper: {
    paddingHorizontal: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  polygon: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 30,
    alignItems: 'center',
  },
  titlePolygon: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: colors.textColor,
  },
  titlePolygonMontserrat: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: colors.textColor,
  },
  subtitlePolygon: {
    fontFamily: 'Almarai-Regular',
    color: colors.textColor,
  },
  contentWrapper: {
    marginVertical: 20,
    alignItems: 'center',
  },
  bigText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 22,
  },
  tableRow: {
    padding: 20,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  tableRowOdd: {
    backgroundColor: colors.backgroundRow,
  },
  tableTitle: {
    fontSize: 16,
    color: colors.textColor,
  },
  almaraiText: {
    fontFamily: 'Almarai-Bold',
  },
  montserratText: {
    fontFamily: 'Montserrat-Bold',
  },
  badgeContent: {
    paddingHorizontal: 20,
  },
  badgeText: {
    fontFamily: 'Almarai-Bold',
    textAlign: 'center',
    fontSize: 14,
    color: colors.textColor,
    marginBottom: 10,
  },
  badgeSubText: {
    fontFamily: 'Almarai-Regular',
    fontSize: 14,
    textAlign: 'center',
    color: colors.textColor,
    lineHeight: 25,
  },
  accordionWrapper: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  accordion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 15,
  },
  footer: {
    paddingHorizontal: 20,
  },
  footerContent: {
    marginVertical: 20,
  },
  footerTitleWrapper: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  footerTitle: {
    fontFamily: 'Almarai-ExtraBold',
    fontSize: 18,
    color: colors.textColor,
    marginLeft: 10,
  },
  footerSubtitle: {
    fontFamily: 'Almarai-Regular',
    fontSize: 18,
    color: colors.textColor,
  },
  footerDescription: {
    marginVertical: 10,
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  footerDescriptionWrapper: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  footerDescriptionWrapperBordered: {
    borderRightColor: '#ECECF1',
    borderRightWidth: 1,
    borderLeftColor: '#ECECF1',
    borderLeftWidth: 1,
    paddingHorizontal: 30,
  },
  footerDescriptionTitle: {
    fontFamily: 'Almarai-Bold',
    color: colors.footerText,
    fontSize: 10,
  },
  footerDescriptionSubtitle: {
    fontFamily: 'Almarai-Regular',
    color: colors.footerText,
    fontSize: 10,
  },
  stickFooter: {
    backgroundColor: '#0A17CC',
    padding: 20,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stickFooterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    width: width / 1.6,
  },
  stickButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
});
