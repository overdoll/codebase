/**
 * @generated SignedSource<<b47d0634ff1dbfdb1232e3d249c5ee07>>
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
    readonly processed: boolean;
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
            "kind": "ScalarField",
            "name": "processed",
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
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "89553d8324dc2d244376b222357f0358";

export default node;
