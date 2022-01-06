/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuickAccessButtonProfileFragment = {
    readonly avatar: {
        readonly urls: ReadonlyArray<{
            readonly url: string;
        }>;
    } | null;
    readonly " $refType": "QuickAccessButtonProfileFragment";
};
export type QuickAccessButtonProfileFragment$data = QuickAccessButtonProfileFragment;
export type QuickAccessButtonProfileFragment$key = {
    readonly " $data"?: QuickAccessButtonProfileFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"QuickAccessButtonProfileFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuickAccessButtonProfileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "avatar",
      "plural": false,
      "selections": [
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
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '193412c760e4e6f9f500695fd5acfca9';
export default node;
