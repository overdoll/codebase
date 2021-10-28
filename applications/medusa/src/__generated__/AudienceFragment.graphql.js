/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type AudienceFragment$ref: FragmentReference;
declare export opaque type AudienceFragment$fragmentType: AudienceFragment$ref;
export type AudienceFragment = {|
  +audience: ?{|
    +id: string,
    +title: string,
  |},
  +$refType: AudienceFragment$ref,
|};
export type AudienceFragment$data = AudienceFragment;
export type AudienceFragment$key = {
  +$data?: AudienceFragment$data,
  +$fragmentRefs: AudienceFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AudienceFragment",
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
          "name": "id",
          "storageKey": null
        },
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
(node: any).hash = '126deb9c50d61d0ae365103c12492081';
module.exports = node;
