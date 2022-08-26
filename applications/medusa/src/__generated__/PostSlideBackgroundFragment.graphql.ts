/**
<<<<<<< HEAD
 * @generated SignedSource<<1906b45ea36399229a7773394af80c80>>
=======
 * @generated SignedSource<<a16a0eafefaa8d31c3f8ec5d2394db05>>
>>>>>>> master
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
<<<<<<< HEAD
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
=======
      "kind": "RequiredField",
      "field": {
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
      },
      "action": "THROW",
      "path": "resource"
>>>>>>> master
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

<<<<<<< HEAD
(node as any).hash = "c894b8eb72c2bc2f87d2fdba76835904";
=======
(node as any).hash = "399957d9093960740f66302b3485e6ad";
>>>>>>> master

export default node;
