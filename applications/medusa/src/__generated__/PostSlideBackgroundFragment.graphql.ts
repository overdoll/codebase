/**
 * @generated SignedSource<<dc713137c3c46159fe53d485a17617b5>>
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "VideoBackgroundFragment"
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

(node as any).hash = "33a2b9c36d9d851cdc09b6ff93ed847b";

export default node;
