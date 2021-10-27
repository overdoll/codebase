/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { ArrangeFragment$ref } from "./ArrangeFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type FlowStepsFragment$ref: FragmentReference;
declare export opaque type FlowStepsFragment$fragmentType: FlowStepsFragment$ref;
export type FlowStepsFragment = {|
  +$fragmentRefs: ArrangeFragment$ref,
  +$refType: FlowStepsFragment$ref,
|};
export type FlowStepsFragment$data = FlowStepsFragment;
export type FlowStepsFragment$key = {
  +$data?: FlowStepsFragment$data,
  +$fragmentRefs: FlowStepsFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowStepsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '925c6deb44564678bf342706537be512';
module.exports = node;
