/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { ArrangeUploadsFragment$ref } from "./ArrangeUploadsFragment.graphql";
import type { ProcessUploadsFragment$ref } from "./ProcessUploadsFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type ArrangeFragment$ref: FragmentReference;
declare export opaque type ArrangeFragment$fragmentType: ArrangeFragment$ref;
export type ArrangeFragment = {|
  +content: $ReadOnlyArray<{|
    +id: string,
    +urls: $ReadOnlyArray<{|
      +url: any,
      +mimeType: string,
    |}>,
  |}>,
  +$fragmentRefs: ArrangeUploadsFragment$ref & ProcessUploadsFragment$ref,
  +$refType: ArrangeFragment$ref,
|};
export type ArrangeFragment$data = ArrangeFragment;
export type ArrangeFragment$key = {
  +$data?: ArrangeFragment$data,
  +$fragmentRefs: ArrangeFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
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
          "concreteType": "ResourceUrl",
          "kind": "LinkedField",
          "name": "urls",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "mimeType",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeUploadsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProcessUploadsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'f7c9d2ccddaea75be9ba69d8d6b6363d';
module.exports = node;
