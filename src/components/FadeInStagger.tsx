'use client';

import React, { Children, useEffect, useState, HTMLAttributes } from 'react'; // Import HTMLAttributes

// Extend the props interface to include standard HTML attributes
interface FadeInStaggerProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  staggerDelay?: number; // Delay between each child animating in (ms)
  animationDuration?: number; // Duration of the fade-in animation (ms)
  as?: React.ElementType; // Add 'as' prop for custom wrapper element
}

const FadeInStagger: React.FC<FadeInStaggerProps> = ({
  children,
  staggerDelay = 100, // Reverted to reasonable default
  animationDuration = 400, // Reverted to reasonable default
  as: Component = 'div', // Default to 'div' if 'as' is not provided
  ...rest // Capture remaining props like className, id, etc.
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation shortly after mount
    const timer = setTimeout(() => setIsVisible(true), 50); // Small delay before starting
    return () => clearTimeout(timer);
  }, []);

  return (
    // Spread the captured 'rest' props onto the Component
    <Component {...rest}> {/* Use the dynamic Component type */}
      {Children.map(children, (child, index) => {
        // Skip rendering non-valid elements (like null, undefined, strings directly)
        // Text nodes need to be wrapped in a span or div to be animated.
        // This basic version only animates direct *element* children.
        if (!React.isValidElement(child)) {
          // If it's plain text, wrap it to animate it (optional, can make text jumpy)
          // if (typeof child === 'string' && child.trim() !== '') {
          //   return (
          //     <span style={{
          //       display: 'inline-block', // Or block depending on context
          //       opacity: isVisible ? 1 : 0,
          //       transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
          //       transition: `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`,
          //       transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms',
          //     }}>
          //       {child}
          //     </span>
          //   );
          // }
          return child; // Return other non-elements (null, etc.)
        }

        // Clone the element to add animation styles
        const element = child as React.ReactElement<any>; // Assert the type
        const currentProps = element.props || {}; // Ensure props is an object
        const currentStyle = currentProps.style || {}; // Ensure style is an object

        return React.cloneElement(element, {
          ...currentProps, // Spread existing props safely
          style: {
            ...currentStyle, // Preserve existing styles safely
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`,
            // Apply delay based on index: 0 for the first element, calculated stagger for others
            transitionDelay: isVisible ? `${index === 0 ? 0 : index * staggerDelay}ms` : '0ms',
          },
        });
      })}
    </Component> // Use the dynamic closing tag
  );
};

export default FadeInStagger;
