/**
 * @generated SignedSource<<1906b45ea36399229a7773394af80c80>>
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
    readonly " $fragmentSpreads": FragmentRefs<"VideoBackgroundFragment">;
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "VideoBackgroundFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "c894b8eb72c2bc2f87d2fdba76835904";

export default node;
