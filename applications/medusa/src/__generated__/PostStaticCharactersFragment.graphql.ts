/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostStaticCharactersFragment = {
    readonly characters: ReadonlyArray<{
        readonly name: string;
        readonly series: {
            readonly title: string;
        };
    }>;
    readonly " $refType": "PostStaticCharactersFragment";
};
export type PostStaticCharactersFragment$data = PostStaticCharactersFragment;
export type PostStaticCharactersFragment$key = {
    readonly " $data"?: PostStaticCharactersFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostStaticCharactersFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStaticCharactersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Series",
          "kind": "LinkedField",
          "name": "series",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'b34c37c164429df344982ff458d06b4e';
export default node;
