/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type useUpdateAudienceFragment$ref: FragmentReference;
declare export opaque type useUpdateAudienceFragment$fragmentType: useUpdateAudienceFragment$ref;
export type useUpdateAudienceFragment = {|
  +id: string,
  +$refType: useUpdateAudienceFragment$ref,
|};
export type useUpdateAudienceFragment$data = useUpdateAudienceFragment;
export type useUpdateAudienceFragment$key = {
  +$data?: useUpdateAudienceFragment$data,
  +$fragmentRefs: useUpdateAudienceFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUpdateAudienceFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'f2dd1f3b86cb3ebe502b24814dad8f7b';
module.exports = node;
