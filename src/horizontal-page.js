import React from 'react';
import { View, Text } from 'react-native';

export default (
  absAngle,
  page,
  halfWidth,
  direction,
  width,
  secondHalfPull,
  styles,
  index,
  that,
  previousPage,
  thisPage,
  nextPage
) => {
  const hiddenStyle = { opacity: 0 };
  const leftHiddenPageOpacityOnNextPage =
    absAngle > 90 ? { opacity: (absAngle - 90) / 90 } : hiddenStyle;
  const rightHiddenPageOpacityOnNextPage =
    absAngle < 90 ? { opacity: (90 - absAngle) / 90 } : hiddenStyle;
  const leftHiddenPageOpacityOnPrevPage = rightHiddenPageOpacityOnNextPage;
  const rightHiddenPageOpacityOnPrevPage = leftHiddenPageOpacityOnNextPage;

  const rightFrontPageOpacityOnPrevPage =
    absAngle < 180 ? { opacity: (180 - absAngle) / 90 } : hiddenStyle;
  const leftFrontPageOpacityOnNextPage = rightFrontPageOpacityOnPrevPage;
  const leftFrontPageOpacityOnPrevPage = { opacity: absAngle / 90 };
  const rightFrontPageOpacityOnNextPage = leftFrontPageOpacityOnPrevPage;

  return (
    <View
      style={[
        styles.page,
        { zIndex: page === index ? 1 : -1 } // Page should not be visible if not current.
      ]}
      key={`page-${index}`}
    >
      <View style={[styles.page, { width: direction === 'left' ? '100%' : 0 }]}>
        <View
          style={[
            styles.half,
            styles.horizontalHalf,
            styles.horizontalFirstHalf,
            styles.under
          ]}
        >
          <View style={width}>{thisPage}</View>
          <View style={[styles.shadow, leftHiddenPageOpacityOnNextPage]} />
        </View>
        <View
          style={[
            styles.half,
            styles.horizontalHalf,
            styles.horizontalSecondHalf,
            styles.under
          ]}
        >
          <View style={secondHalfPull}>{nextPage}</View>
          <View style={[styles.shadow, rightHiddenPageOpacityOnNextPage]} />
        </View>
      </View>
      <View
        style={[styles.page, { width: direction === 'right' ? '100%' : 0 }]}
      >
        <View
          style={[
            styles.half,
            styles.horizontalHalf,
            styles.horizontalFirstHalf,
            styles.under
          ]}
        >
          <View style={width}>{previousPage}</View>
          <View style={[styles.shadow, leftHiddenPageOpacityOnPrevPage]} />
        </View>
        <View
          style={[
            styles.half,
            styles.horizontalHalf,
            styles.horizontalSecondHalf,
            styles.under
          ]}
        >
          <View style={secondHalfPull}>{thisPage}</View>
          <View style={[styles.shadow, rightHiddenPageOpacityOnPrevPage]} />
        </View>
      </View>
      {/* Current page */}
      <View style={styles.page}>
        {/* Left part */}
        <View
          style={[
            styles.half,
            styles.horizontalHalf,
            styles.horizontalFirstHalf,
            { zIndex: direction === 'right' ? 4 : 3 },
            { width: direction === 'left' ? 0 : '50%' }
          ]}
          ref={view => (that.firstHalves[index] = view)}
        >
          <View
            style={[
              { zIndex: absAngle < 90 || direction !== 'right' ? 3 : 2 },
              width
            ]}
          >
            {thisPage}
            <View style={[styles.shadow, leftFrontPageOpacityOnPrevPage]} />
          </View>
          <View
            style={[
              styles.page,
              {
                zIndex: absAngle > 90 && direction === 'right' ? 3 : 2
              }
            ]}
            transform={[{ rotateZ: '180deg' }, { rotateX: '180deg' }]}
          >
            <View style={secondHalfPull}>{previousPage}</View>
            <View style={[styles.shadow, rightFrontPageOpacityOnPrevPage]} />
          </View>
        </View>
        {/* Right part */}
        <View
          style={[
            styles.half,
            styles.horizontalHalf,
            styles.horizontalSecondHalf,
            { zIndex: direction === 'left' ? 4 : 3 },
            { width: direction === 'right' ? 0 : '50%' }
          ]}
          ref={view => (that.secondHalves[index] = view)}
        >
          <View
            style={[
              secondHalfPull,
              { zIndex: absAngle < 90 || direction === 'right' ? 3 : 2 }
            ]}
          >
            {thisPage}
            <View style={[styles.shadow, rightFrontPageOpacityOnNextPage]} />
          </View>
          <View
            style={[
              styles.page,
              { zIndex: absAngle > 90 && direction === 'left' ? 3 : 2 }
            ]}
            transform={[{ rotateZ: '180deg' }, { rotateX: '180deg' }]}
          >
            <View style={width}>{nextPage}</View>
            <View style={[styles.shadow, leftFrontPageOpacityOnNextPage]} />
          </View>
        </View>
      </View>
      <View
        style={[
          styles.page,
          {
            top: direction !== '' ? '-100%' : 0,
            overflow: 'hidden'
          }
        ]}
      >
        {thisPage}
      </View>
    </View>
  );
};
