/**
 * @generated SignedSource<<774f16e35503caf2d53aa9c366b2d902>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useVideoControlsFragment$data = {
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

(node as any).hash = "0ff0728647864e8a23fa75666916b627";

export default node;
