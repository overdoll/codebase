/**
 * @generated SignedSource<<598b29c63f4e43b5215c897f9937df7a>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "PostVideoMediaFragment">;
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
      "name": "PostVideoMediaFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "cddf617ed74213e95cf68f867b654e64";

export default node;
