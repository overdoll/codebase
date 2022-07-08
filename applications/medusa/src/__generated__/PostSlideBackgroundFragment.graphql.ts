/**
 * @generated SignedSource<<953f56d0eb206f9c2e0facf45da8aa11>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostSlideBackgroundFragment$data = {
  readonly resource: {
    readonly preview: string;
    readonly type: ResourceType;
    readonly videoThumbnail: {
      readonly url: string;
    } | null;
  };
  readonly " $fragmentType": "PostSlideBackgroundFragment";
};
export type PostSlideBackgroundFragment$key = {
  readonly " $data"?: PostSlideBackgroundFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSlideBackgroundFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSlideBackgroundFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "resource",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "preview",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
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
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "bc66e4844c5aefdf417d3928e52e51d2";

export default node;
