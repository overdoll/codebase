/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { AudienceTagFragment$ref } from "./AudienceTagFragment.graphql";
import type { BrandTagFragment$ref } from "./BrandTagFragment.graphql";
import type { CategoryTagFragment$ref } from "./CategoryTagFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type FlowStepsTagFragment$ref: FragmentReference;
declare export opaque type FlowStepsTagFragment$fragmentType: FlowStepsTagFragment$ref;
export type FlowStepsTagFragment = {|
  +$fragmentRefs: AudienceTagFragment$ref & BrandTagFragment$ref & CategoryTagFragment$ref,
  +$refType: FlowStepsTagFragment$ref,
|};
export type FlowStepsTagFragment$data = FlowStepsTagFragment;
export type FlowStepsTagFragment$key = {
  +$data?: FlowStepsTagFragment$data,
  +$fragmentRefs: FlowStepsTagFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowStepsTagFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AudienceTagFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BrandTagFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CategoryTagFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '77a13e774a330d3b88956941e401a87e';
module.exports = node;
