// Copyright (c) 2020 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, { Component } from "react";
import PropTypes from "prop-types";
import Base from "./base";

export default class Delete extends Component {
  static propTypes = {
    height: PropTypes.string,
  };

  static defaultProps = {
    height: "16px",
    predefinedClassName: "data-ex-icons-delete",
  };

  render() {
    return (
      <Base {...this.props}>
        <g transform="translate(8, 8)">
          <path
            d="M451.146,384.186l-62.4-48.64c-17.493-13.653-42.027-13.547-59.307,0.213l-13.867,10.987
				c-10.667,8.427-25.92,7.573-35.413-2.027L168.586,232.826c-9.6-9.6-10.453-24.96-2.027-35.627l10.987-13.867
				c13.76-17.387,13.867-41.92,0.213-59.413l-48.533-62.507c-16.213-20.907-46.4-24.747-67.307-8.533
				c-1.6,1.28-3.093,2.56-4.587,4.053l-40,40c-22.08,22.08-53.973,93.013,125.76,273.173
				c117.227,117.44,188.693,142.08,228.053,142.08c23.573,0,37.333-8.747,44.693-16.107l39.893-39.893
				c18.773-18.88,18.773-49.387-0.107-68.16C454.133,386.64,452.746,385.36,451.146,384.186z M442.612,438.586
				c-0.64,0.96-1.387,1.813-2.133,2.56l-39.893,39.893c-4.48,4.48-13.227,9.813-29.547,9.813c-28.907,0-94.933-17.6-212.907-135.893
				c-135.893-136.107-152.64-216-125.76-242.987L72.266,72.08c5.013-5.013,11.84-7.787,18.88-7.787c0.533,0,1.067,0,1.6,0
				c7.68,0.533,14.72,4.267,19.413,10.24l48.533,62.507c7.573,9.707,7.573,23.36-0.107,33.067l-10.987,13.867
				c-15.147,19.2-13.547,46.613,3.733,63.893l111.68,111.787c17.173,17.28,44.693,18.88,63.787,3.733l13.867-10.987
				c9.6-7.68,23.253-7.68,32.96-0.107l62.4,48.64C449.759,410.106,451.786,426.96,442.612,438.586z"
          />
          <path
            d="M267.039,0.186c-5.867,0-10.667,4.8-10.667,10.667c0,5.867,4.8,10.667,10.667,10.667c123.52,0,224,100.48,224,224
				c0,5.867,4.8,10.667,10.667,10.667c5.867,0,10.667-4.8,10.667-10.667C512.372,110.266,402.292,0.186,267.039,0.186z"
          />
          <path
            d="M437.706,245.52c0,5.867,4.8,10.667,10.667,10.667c5.867,0,10.667-4.8,10.667-10.667c0-105.92-86.187-192-192-192
				c-5.867,0-10.667,4.8-10.667,10.667c0,5.867,4.693,10.667,10.667,10.667C361.119,74.853,437.706,151.44,437.706,245.52z"
          />
          <path
            d="M267.039,128.293c64.64,0,117.333,52.587,117.333,117.12c0,5.867,4.8,10.667,10.667,10.667
				c5.867,0,10.667-4.8,10.667-10.667c0-76.373-62.187-138.56-138.667-138.56c-5.867,0-10.667,4.8-10.667,10.667
				C256.372,123.386,261.066,128.293,267.039,128.293z"
          />
          <path
            d="M267.146,160.4c-5.867,0-10.667,4.8-10.667,10.667s4.8,10.667,10.667,10.667c35.093,0,63.467,28.48,63.467,63.467
				c0,5.867,4.8,10.667,10.667,10.667c5.867,0,10.667-4.8,10.667-10.667C351.946,198.373,313.972,160.4,267.146,160.4z"
          />
        </g>
      </Base>
    );
  }
}
