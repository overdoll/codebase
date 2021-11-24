/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostAudienceFragment$ref: FragmentReference;
declare export opaque type PostAudienceFragment$fragmentType: PostAudienceFragment$ref;
export type PostAudienceFragment = {|
  +audience: ?{|
    +title: string
  |},
  +$refType: PostAudienceFragment$ref,
|};
export type PostAudienceFragment$data = PostAudienceFragment;
export type PostAudienceFragment$key = {
  +$data?: PostAudienceFragment$data,
  +$fragmentRefs: PostAudienceFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostAudienceFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '97078cab8850539062b9dbab3b1ae074';
module.exports = node;
