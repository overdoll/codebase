/**
 * @generated SignedSource<<b2eed10b3b2324be5a0f72784ec1fc06>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostMediaFragment$data = {
  readonly type: ResourceType;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "ControlledVideoFragment">;
  readonly " $fragmentType": "PostMediaFragment";
};
export type PostMediaFragment = PostMediaFragment$data;
export type PostMediaFragment$key = {
  readonly " $data"?: PostMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostMediaFragment",
  "selections": [
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
      "name": "ImageSnippetFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ControlledVideoFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "b0147c91c2af72e8463bef3a4b7a814a";

export default node;
