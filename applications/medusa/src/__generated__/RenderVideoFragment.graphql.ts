/**
 * @generated SignedSource<<912f98e8c5dcd1c6397cad6df524440b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RenderVideoFragment$data = {
  readonly id: string;
  readonly videoThumbnail: {
    readonly url: string;
  } | null;
  readonly " $fragmentType": "RenderVideoFragment";
};
export type RenderVideoFragment$key = {
  readonly " $data"?: RenderVideoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RenderVideoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RenderVideoFragment",
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
      "name": "videoThumbnail",
      "plural": false,
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
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "3336fad13929e8616948047d7cb27c93";

export default node;
