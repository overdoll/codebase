/**
 * @generated SignedSource<<6a6528ac1469f1176c0ee9585aef53a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useVideoControlsFragment$data = {
  readonly id: string;
  readonly urls: ReadonlyArray<{
    readonly mimeType: string;
    readonly url: string;
  }>;
  readonly " $fragmentType": "useVideoControlsFragment";
};
export type useVideoControlsFragment$key = {
  readonly " $data"?: useVideoControlsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useVideoControlsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useVideoControlsFragment",
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
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "6c0000cc85fa28342fa55208760e8b15";

export default node;
