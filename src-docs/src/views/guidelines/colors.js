import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { GuidePage } from '../../components';

import {
  WuiText,
  WuiSpacer,
  WuiFlexGrid,
  WuiFlexItem,
  WuiLink,
  WuiCode,
  WuiTitle,
} from '../../../../src/components';
import { ratingAA, allowedColors } from './colors/_utilities';
import { CorePalette } from './colors/core_palette';
import { VisPalette } from './colors/vis_palette';
import { ColorSection } from './colors/color_section';
import { ContrastSlider } from './colors/contrast_slider';

export default ({ selectedTheme }) => {
  const [showTextVariants, setShowTextVariants] = useState(true);
  const [contrastValue, setContrastValue] = useState(3);
  const selectedThemeIsDark = selectedTheme.includes('dark');

  return (
    <GuidePage title="Color guidelines">
      <WuiText grow={false} className="guideSection__text">
        <h2>Wazuh UI builds with a very limited palette.</h2>
        <p>
          We use a core set of three colors, combined with a green / orange /
          red qualitative set of three, and finally combine those against a
          six-color grayscale. Variation beyond these colors is minimal and
          always done with math manipulation against the original set.
        </p>
      </WuiText>

      <WuiSpacer />

      <CorePalette colors={allowedColors} theme={selectedTheme} />

      <WuiSpacer size="xxl" />

      <WuiText grow={false} className="guideSection__text">
        <h2>Variable naming</h2>
        <p>
          We use the same variable names of each color in all themes. That means
          that our gray color names are opposite of their values in dark mode.
          By just changing the values of the color, and not the usages of the
          variables, we make it easier for the development multiple themes.
        </p>
      </WuiText>

      <WuiSpacer size="xxl" />

      <WuiText grow={false} className="guideSection__text">
        <h2>Accessible text contrast</h2>
        <p>
          <WuiLink href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html">
            WCAG specifications
          </WuiLink>{' '}
          defines specific contrast ratios between foreground text and a
          background color. The grids below display which color combinations
          pass that rating. In general you should try to use a color combination
          that is {ratingAA} or above with the exception of using large text.
        </p>
      </WuiText>

      <WuiSpacer size="xl" />

      <WuiTitle size="xs">
        <h3>
          Use the slider and toggle to adjust the color combinations shown in
          the sections below.
        </h3>
      </WuiTitle>
      <WuiSpacer size="m" />

      {/* This wrapping div for the sticky positioning */}
      <div>
        <ContrastSlider
          contrastValue={contrastValue}
          showTextVariants={showTextVariants}
          onChange={(sliderValue, toggleChecked) => {
            setContrastValue(sliderValue);
            setShowTextVariants(toggleChecked);
          }}
        />

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiColorPrimary'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Main brand color and used for most call to actions like{' '}
            <Link to="/navigation/button">buttons</Link> and{' '}
            <Link to="/navigation/link">links</Link>. Reserve usages to elements
            with interactions like clickable items not for plain text.
          </p>
        </ColorSection>

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiColorAccent'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Pulls attention to key indicators like{' '}
            <Link to="/display/badge">notifications</Link> or{' '}
            <Link to="/navigation/facet">number of selections</Link>. Don&apos;t
            use on elements with interactions.
          </p>
        </ColorSection>

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiColorSuccess'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Also known as <WuiCode>wuiColorSecondary</WuiCode>. Use this for
            success graphics and <strong>additive</strong> actions.
          </p>
        </ColorSection>

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiColorWarning'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Use this for warnings and actions that have a{' '}
            <strong>potential</strong> to be destructive.
          </p>
        </ColorSection>

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiColorDanger'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Use this for negative graphics like errors and{' '}
            <strong>destructive</strong> actions.
          </p>
        </ColorSection>

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiColorEmptyShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Used as the background color of primary{' '}
            <Link to="/layout/page">page content</Link> and{' '}
            <Link to="/layout/panel">panels</Link> including{' '}
            <Link to="/layout/modal">modals</Link> and{' '}
            <Link to="/layout/flyout">flyouts</Link>. Place your main content on
            top of this color, or a panel-style component, to{' '}
            <strong>ensure proper contrast</strong>.
          </p>
          {selectedThemeIsDark ? (
            <p>
              If you need a color that is full black in{' '}
              <strong>both light and dark modes</strong>, use{' '}
              <WuiCode>wuiColorInk</WuiCode>.
            </p>
          ) : (
            <p>
              If you need a color that is full white in{' '}
              <strong>both light and dark modes</strong>, use{' '}
              <WuiCode>wuiColorGhost</WuiCode>.
            </p>
          )}
        </ColorSection>

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiColorLightestShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Used to lightly shade areas that contain secondary content or{' '}
            <strong>contain</strong> panel-like components. Proper contrast of
            text on this color cannot be guaranteed.
          </p>
        </ColorSection>

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiPageBackgroundColor'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            The background color for the whole window (body) is a slightly
            altered version of <WuiCode>wuiColorLightestShade</WuiCode> that{' '}
            <strong>does</strong> provide proper contrast for the text variant
            colors.
          </p>
        </ColorSection>

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiColorLightShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            Used for most borders and dividers (
            <Link to="/layout/horizontal-rule">horizontal rules</Link>).
          </p>
        </ColorSection>

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiColorMediumShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            The middle gray for all themes; this is the base for{' '}
            <WuiCode>wuiTextSubduedColor</WuiCode>. Use subdued text for hint or
            inconsequential text.
          </p>
        </ColorSection>

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiColorDarkShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            A slightly less subtle shade for text, yet more subtle than the
            default text color.
          </p>
        </ColorSection>

        <WuiSpacer size="xxl" />
        <WuiSpacer size="xxl" />

        <ColorSection
          color={'wuiColorDarkestShade'}
          minimumContrast={contrastValue}
          showTextVariants={showTextVariants}>
          <p>
            The default <Link to="/display/text">text</Link> color and the
            background color for inverted backgrounds like{' '}
            <Link to="/display/tooltip">tooltips</Link> and the{' '}
            <Link to="/navigation/control-bar">control bar</Link>.{' '}
            {!selectedThemeIsDark && (
              <>
                <Link to="/display/title">Titles</Link> are shaded slightly
                darker than normal text.
              </>
            )}
          </p>
        </ColorSection>

        <WuiSpacer size="xxl" />
      </div>

      <WuiSpacer size="xxl" />

      <ColorSection
        color={'wuiColorFullShade'}
        minimumContrast={contrastValue}
        showTextVariants={showTextVariants}>
        <p>
          The opposite of <WuiCode>wuiColorEmptyShade</WuiCode>.
        </p>
        {selectedThemeIsDark ? (
          <p>
            If you need a color that is full white in{' '}
            <strong>both light and dark modes</strong>, use{' '}
            <WuiCode>wuiColorGhost</WuiCode>.
          </p>
        ) : (
          <p>
            If you need a color that is full black in{' '}
            <strong>both light and dark modes</strong>, use{' '}
            <WuiCode>wuiColorInk</WuiCode>.
          </p>
        )}
      </ColorSection>

      <WuiSpacer size="xxl" />
      <WuiSpacer size="xxl" />

      <WuiText grow={false} className="guideSection__text">
        <h2>Categorical visualization palette</h2>
        <p>
          The following colors are color-blind safe and should be used in
          categorically seried visualizations and graphics. They are meant to be
          contrasted against the value of <WuiCode>wuiColorEmptyShade</WuiCode>{' '}
          for the current theme.
        </p>
        <p>
          For more visualization palettes and rendering services, go to the{' '}
          <Link to="/utilities/color-palettes">Color Palettes</Link> utility
          page.
        </p>
        <p>
          When using the palette as a background for text (i.e. badges), use the{' '}
          <WuiCode>_behindText</WuiCode> variant. It is a brightened version of
          the base palette to create better contrast with text.
        </p>
      </WuiText>

      <WuiSpacer />

      <WuiSpacer />

      <WuiFlexGrid columns={2}>
        <WuiFlexItem>
          <VisPalette variant="graphic" />
        </WuiFlexItem>
        <WuiFlexItem>
          <VisPalette variant="behindText" />
        </WuiFlexItem>
      </WuiFlexGrid>
    </GuidePage>
  );
};
