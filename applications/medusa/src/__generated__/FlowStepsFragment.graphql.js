/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { ArrangeFragment$ref } from "./ArrangeFragment.graphql";
import type { AudienceFragment$ref } from "./AudienceFragment.graphql";
import type { BrandFragment$ref } from "./BrandFragment.graphql";
import type { CategoryFragment$ref } from "./CategoryFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type FlowStepsFragment$ref: FragmentReference;
declare export opaque type FlowStepsFragment$fragmentType: FlowStepsFragment$ref;
export type FlowStepsFragment = {|
  +$fragmentRefs: ArrangeFragment$ref & AudienceFragment$ref & BrandFragment$ref & CategoryFragment$ref,
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AudienceFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BrandFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CategoryFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'dd5cadc0d88640183a1920dbbeef38e1';
module.exports = node;
